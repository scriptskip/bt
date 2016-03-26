var window = window;

var game =
{
	create:
	{
		set canvas (canvas)
		{
			canvas = window.document.createElement ('canvas');
			canvas.context = canvas.getContext ('2d');
			canvas.draw = true;

			canvas.autosize = function () { canvas.height = window.innerHeight; canvas.width = window.innerWidth; };
			canvas.clear = function () { canvas.context.clearRect (0, 0, canvas.width, canvas.height); };
			canvas.css = function () { for (var name in game.option.canvas.css) canvas.style[name] = game.option.canvas.css[name];};
			canvas.load = function () { canvas.css (); canvas.autosize (); };

			canvas.update = function (event)
			{
				switch (event.type)
				{
					case 'resize': canvas.autosize (); break;
				};
			};

			canvas.load ();
			game.data.canvas = canvas;
			window.document.body.appendChild (canvas);
		},

		set button (button)
		{
			button.id = game.data.object.length;

			button.draw =
			{
				normal: { box: [{ fill: '#000', h: 0.1, w: 0.1, x: 0.5, y: 0.5, z: 2 }] },
				show: 'normal'
			};

			button.update = function (event) {};

			game.data.object.push (button);
		},

		set event (events) { for (var i = events.length; i--;) { var event = 'on' + events[i]; window[event] = function (event) { game.run (event); }; }},

		set window (window)
		{
			Object.defineProperties ( window, { 'log': { set: function (log) { window.console.log (log); } }, 'ontick': { set: function (f) { window.clock = window.setInterval ( function () { f ({ tick: window.tick, time: window.time, type: 'tick' }); window.time += window.tick; }); }}, 'tick': { value: game.option.tick, writable: true }, 'time': { value: 0, writable: true }});
			for (var name in game.option.body.css) window.document.body.style[name] = game.option.body.css[name];
		}
	},

	data: { audio: [], image: [], object: [] },

	draw: function ()
	{
		if (game.data.canvas.draw)
		{
			var context = game.data.canvas.context;
			for (var z = 0; z < game.option.canvas.z; z++)
			{
				for (var id = game.data.object.length; id--;)
				{
					var object = game.data.object[id];
					if (object.draw)
					{
						var frame = object.draw[object.draw.show];
						for (var type in frame)
						{
							var draw = frame[type];
							for (var i = draw.length; i--;)
							{
								var call = draw[i];
									call.z = call.z || 0;

								if (z == call.z)
								{
									var fill = call.fill;
									var stroke = call.stroke;

									var a = call.a * game.data.canvas.width;
									var b = call.b * game.data.canvas.height;
									var h = call.h * game.data.canvas.height;
									var w = call.w * game.data.canvas.width;
									var x = call.x * game.data.canvas.width;
									var y = call.y * game.data.canvas.height;

									switch (type)
									{
										case 'box':
											if (fill)
											{
												context.fillStyle = fill;
												context.fillRect (x, y, w, h);
											};
											if (stroke)
											{
												context.strokeStyle = stroke;
												context.strokeRect (x, y, w, h);
											};
										break;
									};
								};
							};
						};
					};
				};
			};
			game.data.canvas.draw = false;
		};
	},

	set load (load)
	{
		window.onload = function ()
		{
			game.create.window = window;
			game.create.canvas = {};
			game.create.event = game.option.event.list;
			game.create.button = {};
		};
	},

	option:
	{
		body: { css: { background: '#bbb', margin: 0 }},
		canvas: { css: { position: 'absolute' }, z: 5 },
		event: { list: [ 'click', 'resize', 'tick' ]},
		tick: 100
	},

	run: function (event) { game.update (event); game.draw (); },

	update: function (event)
	{
		game.data.canvas.update (event);
		for (var id = game.data.object.length; id--;) if (game.data.object[id].update) game.data.object[id].update (event);
	}
};

game.load = {};