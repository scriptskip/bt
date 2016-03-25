var window = window;

var game =
{
	create:
	{
		set canvas (canvas)
		{
			canvas = window.document.createElement ('canvas');
			canvas.context = canvas.getContext ('2d');
			game.data.canvas = canvas;
			window.document.body.appendChild (canvas);
		},

		set button (button)
		{
			button.id = game.data.object.length;

			button.draw = function (event) {};
			button.update = function (event) {};

			game.data.object.push (button);
		},

		set event (events)
		{
			for (var i = events.length; i--;)
			{
				var event = 'on' + events[i];
				window[event] = function (event) { game.run (event); };
			}
		},

		set window (window)
		{
			Object.defineProperties
			(
				window,
				{
					'log': { set: function (log) { window.console.log (log); } },

					'ontick':
					{
						set: function (f)
						{
							window.clock = window.setInterval
							(
								function ()
								{
									f ({ tick: window.tick, time: window.time, type: 'tick' });
									window.time += window.tick;
								}
							);
						}
					},

					'tick': { value: game.option.tick, writable: true },

					'time': { value: 0, writable: true }
				}
			);

			for (var name in game.option.body.style)
			{
				window.document.body.style[name] = game.option.body.style[name];
			};
		}
	},

	data: { audio: [], image: [], object: [] },

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
		body:
		{
			style:
			{
				background: '#000',
				margin: 0
			}
		},

		event: { list: [ 'click', 'resize', 'tick' ] },

		tick: 100
	},

	run: function (event)
	{
		for (var id = game.data.object.length; id--;)
		{
			game.data.object[id].update (event);
			game.data.object[id].draw (event);
		};
	}
};

game.load = {};