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
			canvas.redraw = function () { canvas.clear (); canvas.draw = true; };

			canvas.update = function (event)
			{
				switch (event.type)
				{
					case 'resize': canvas.autosize (); canvas.draw = true; break;
				};
			};

			canvas.load ();
			game.data.canvas = canvas;
			window.document.body.appendChild (canvas);
		},

		set button (button)
		{
			button.id = game.data.object.length;

			button.blossom = button.fill;
			button.bloom = button.color || button.fill;

			button.border = button.stroke;
			button.frame = button.frame || button.stroke;

			button.over = false;
			button.type = button.type || 'box';

			button.active = function (event)
			{
				if (window.detect (event, button, button.type))
				{
					if (!button.over)
					{
						if (button.color) button.fill = button.bloom;
						if (button.frame) button.stroke = button.frame;
						game.data.canvas.redraw ();
						game.data.canvas.style.cursor = 'pointer';
						button.over = true;
					};
				}
				else
				{
					if (button.over)
					{
						if (button.color) button.fill = button.blossom;
						if (button.frame) button.stroke = button.border;
						game.data.canvas.redraw ();
						game.data.canvas.style.cursor = 'default';
						button.over = false;
					};
				};
			};

			button.in = function () {};
			button.out = function () {};

			button.draw =
			{
				box: { box: [ button ], text: [ button.text ]},
				ring: { ring: [ button ], text: [ button.text ]},
				show: button.type
			};

			button.update = function (event)
			{
				switch (event.type)
				{
					case 'mousemove': button.active (event); break;
				};
			};

			game.data.object.push (button);
		},

		set event (events) { for (var i = events.length; i--;) { var event = 'on' + events[i]; window[event] = function (event) { game.run (event); }; }},

		set window (window)
		{
			Object.defineProperties ( window, { 'log': { set: function (log) { window.console.log (log); } }, 'ontick': { set: function (f) { window.clock = window.setInterval ( function () { f ({ tick: window.tick, time: window.time, type: 'tick' }); window.time += window.tick; }); }}, 'tick': { value: game.option.tick, writable: true }, 'time': { value: 0, writable: true }});

			window.font = function (o) { return o.font * game.data.canvas.height; };
			window.h = function (o)
			{
				var h = o.h || 2 * o.r || window.font (o);
				var w = o.w || 2 * o.r || game.data.canvas.context.measureText (o.text).width;
				return (o.hk) ? o.hk * w * game.data.canvas.width : h * game.data.canvas.height;
			};
			window.r = function (o) { return o.r * Math.min (game.data.canvas.height, game.data.canvas.width); };
			window.w = function (o)
			{
				var h = o.h || 2 * o.r || window.font (o);
				var w = o.w || 2 * o.r || game.data.canvas.context.measureText (o.text).width;
				return (o.wk) ? o.wk * h * game.data.canvas.height : w * game.data.canvas.width;
			};
			window.x = function (o) { var xk = o.xk || 0; return o.x * game.data.canvas.width - xk * window.w (o); };
			window.y = function (o) { var yk = o.yk || 0; return o.y * game.data.canvas.height - yk * window.h (o); };

			window.detect = function (e, o, t)
			{
				t = t || 'box';
				switch (t)
				{
					case 'box': return ((e.x >= window.x (o)) && (e.x <= window.x (o) + window.w (o)) && (e.y >= window.y (o)) && (e.y <= window.y (o) + window.h (o))); break;
					case 'ring': var r = Math.sqrt (Math.pow (e.x - window.x (o), 2) + Math.pow (e.y - window.y (o), 2)); return (r <= window.r (o)); break;
				};
			};

			for (var name in game.option.body.css) window.document.body.style[name] = game.option.body.css[name];
		}
	},

	data: { audio: [], image: [], object: [] },

	draw: function ()
	{
		if (game.data.canvas.draw)
		{
			var c = game.data.canvas.context;
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
								var call = draw[i] || {};
									call.z = call.z || 0;

								if (z == call.z)
								{
									var cos = call.cos || 2 * Math.PI; var sin = call.sin || 0;
									var fill = call.fill; var stroke = call.stroke;
									var font = window.font (call);
									var H = game.data.canvas.height; var W = game.data.canvas.width;
									var h = window.h (call); var r = window.r (call); var w = window.w (call);
									var t = call.text;
									var x = window.x (call); var y = window.y (call);

									if (call.align) c.textAlign = call.align;
									if (call.baseline) c.textBaseline = call.baseline;
									if (call.line) c.lineWidth = Math.floor (call.line * Math.min (H, W));
									if (call.real == undefined) { font = Math.floor(font); h = Math.floor (h); w = Math.floor (w); x = Math.floor (x); y = Math.floor (y); };
									if (fill) c.fillStyle = fill;
									if (font) c.font = font + 'px ' + game.option.font.face;
									if (stroke) c.strokeStyle = stroke;

									switch (type)
									{
										case 'box':
											if (fill) c.fillRect (x, y, w, h);
											if (stroke) c.strokeRect (x, y, w, h);
										break;

										case 'ring':
											if (fill) { c.arc (x, y, r, sin, cos); c.fill (); };
											if (stroke) { c.arc (x, y, r, sin, cos); c.stroke (); };
										break;

										case 'text':
											if (fill) { c.fillText (t, x, y); };
											if (stroke) { c.strokeText (t, x, y); };
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
			game.create.button = { color: '#ccc', fill: '#ccc', frame: '#bbb', hk: 1, line: 0.01, r: 0.1, text: { align: 'center', baseline: 'middle', fill: '#500', font: 0.1, text: 'button', x: 0.5, y: 0.5, z: 2 }, type: 'box', w: 0.1, x: 0.5, xk: 0.5, y: 0.5, yk: 0.5, z: 1 };
		};
	},

	option:
	{
		body: { css: { background: '#bbb', margin: 0 }},
		canvas: { css: { position: 'absolute' }, z: 3 },
		event: { list: [ 'click', 'mousemove', 'resize', 'tick' ]},
		font: { face: 'Arial', size: 0.1 },
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