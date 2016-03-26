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
				normal: { box: [ button ]},
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
									var H = game.data.canvas.height;
									var W = game.data.canvas.width;

									var fill = call.fill;
									var stroke = call.stroke;

									var h = (call.hk) ? call.hk * call.w * W : call.h * H;
									var w = (call.wk) ? call.wk * call.h * H : call.w * W;

									var xk = call.xk || 0;
									var yk = call.yk || 0;
									var x = call.x * W - xk * w;
									var y = call.y * H - yk * h;

									if (call.line) context.lineWidth = Math.floor (call.line * Math.min (H, W));

									if (!call.real) { h = Math.floor (h); w = Math.floor (w); x = Math.floor (x); y = Math.floor (y); };

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
			game.create.button = { fill: '#fff', hk: 1, line: 0.01, stroke: '#000', w: 0.1, x: 0.5, xk: 0.5, y: 0.5, yk: 0.5, z: 1 };
		};
	},

	option:
	{
		body: { css: { background: '#bbb', margin: 0 }},
		canvas: { css: { position: 'absolute' }, z: 3 },
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