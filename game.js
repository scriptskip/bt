var window = window;

var game =
{
	create:
	{
		set canvas (canvas)
		{
			canvas = window.document.createElement ('canvas');
			canvas.context = canvas.getContext ('2d');

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
				normal: { box: [{ h: 0.1, w: 0.1, x: 0.5, y: 0.5, z: 2 }] },
				state: 'normal'
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
		for (var z = 0; z < game.option.canvas.z; z++)
		{
			for (var id = game.data.object.length; id--;)
			{
				var draw = game.data.object[id].draw;
				if (draw.z == z)
				{

				};
			};
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