var g = {
	c: function () {
		var c = g.w.d.createElement ('canvas');
			c.c = c.getContext ('2d');
			c.d = true;
			c.z = 0;

			c.a = function () { c.h (g.w.h); c.w (g.w.w); g.c.d = true; };
			c.b = function (c) { g.c.style.background = c; };
			c.h = function (h) { if (h) c.height = h; else return c.height; };
			c.w = function (w) { if (w) c.width = w; else return c.width; };

		c.u = function () { switch (g.e.type) {
			case 'resize': c.a (); break;
		};};

		c.a ();
		g.w.d.b.appendChild (c);
		delete g.c;
		g.c = c;
	},

	d: function (d) {
		if (d) {
			d.type = 'box';
			d.z = d.z || 0; g.c.z = (d.z > g.c.z) ? d.z : g.c.z;

			g.c.d = d.d || false;
			g.s.push (d);
		};

		if (g.c.d) {
			for (var z = 0; z <= g.c.z; z++) {
				for (var id = 0; id < g.s.length; id++) {
					var c = g.s[id];
					if (c.z == z) {
						g.w.l = id;
						var h = c.h * g.c.h ();
						var w = c.w * g.c.w ();
						var x = c.x * g.c.w ();
						var y = c.y * g.c.h ();

						if (c.f) g.c.c.fillStyle = c.f;

						switch (c.type) {
							case 'box':
								if (c.f) g.c.c.fillRect (x, y, w, h);
							break;
						};
					};
				};
			};
			g.c.d = false;
		};
	},

	e: function () {
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

	g: {
		set b (b) {
			b.id = 'button' + g.o.length;

			b.s = function ()
			{
				g.d ({ f: '#00f', h: 0.1, id: b.id, w: 0.1, x: 0.5, y: 0.5 });
				g.d ({ f: '#00f', h: 0.1, id: b.id, w: 0.1, x: 0.2, y: 0.5 });
				g.c.d = true;
			};

			b.u = function () { switch (g.e.type) {
				case 'click': g.w.l = g.e.type; break;
			};};

			b.s ();
			g.o.push (b);
		}
	},

	set l (l) {
		window.onload = function () { g.w (); g.c (); g.e (); l ();};
	},

	o: [],
	s: [],

	w: function () {
		var w = window;
			w.d = w.document;
			w.d.b = w.d.body;
			w.h = w.innerHeight;
			w.i = 100;
			w.t = 0;
			w.w = w.innerWidth;

		Object.defineProperties (w, {
			'l': { set: function (l) { w.console.log (l); }},
			'ontick': { set: function (f) { w.c = w.setInterval (function () { f ({i: w.i, t: w.t, type: 'tick' }); w.t += w.i; }, w.i); }},
		});

		w.u = function () { switch (g.e.type) {
			case 'resize': w.h = w.innerHeight; w.w = w.innerWidth; break;
		};};

		delete g.w;
		g.w = w;
	},

	u: function () {
		g.w.u ();
		g.c.u ();
		for (var i = g.o.length; i--;) if (g.o[i].u) g.o[i].u ();
	}
};

g.l = function ()
{
	//g.c.z = 1;
	g.g.b = {};
};