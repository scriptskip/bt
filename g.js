var g =
{
	c: function ()
	{
		var c = g.w.d.createElement ('canvas');
			c.c = c.getContext ('2d');

			c.a = function () { c.h (g.w.h); c.w (g.w.w); };
			c.b = function (c) { g.c.style.background = c; };
			c.h = function (h) { c.height = h || c.height; return c.height; };
			c.w = function (w) { c.width = w || c.width; return c.width; };

		c.u = function ()
		{
			switch (g.e.type)
			{
				case 'resize': c.a (); break;
			};
		};

		c.a ();
		g.w.d.b.appendChild (c);
		delete g.c;
		g.c = c;
	},

	d: function ()
	{

	},

	e: function ()
	{
		var e = {};
			e._ = function () { return false; };
			e.$ = function (event) { g.e = event; g.u (); g.d (); };

		g.w.onclick = e.$;
		g.w.oncontextmenu = e._;
		g.w.onmousedown = e.$;
		g.w.onmousemove = e.$;
		g.w.onmouseup = e.$;
		g.w.onresize = e.$;
		g.w.ontick = e.$;

		delete g.e;
		g.e = e;
	},

	set l (l)
	{
		l ();
		window.onload = function () { g.w (); g.c (); g.e (); };
	},

	w: function ()
	{
		var w = window;
			w.d = w.document;
			w.d.b = w.d.body;
			w.h = w.innerHeight;
			w.i = 100;
			w.t = 0;
			w.w = w.innerWidth;

		Object.defineProperties (w,
		{
			'l': { set: function (l) { w.console.log (l); }},
			'ontick': { set: function (f) { w.c = w.setInterval (function () { f ({i: w.i, t: w.t, type: 'tick' }); w.t += w.i; }, w.i); }},
		});

		w.u = function ()
		{
			switch (g.e.type)
			{
				case 'resize': w.h = w.innerHeight; w.w = w.innerWidth; break;
			};
		};

		delete g.w;
		g.w = w;
	},

	u: function ()
	{
		g.w.u ();
		g.c.u ();
	}
};

g.l = function () {};