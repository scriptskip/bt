var g = {
	c: function () {
		var c = g.w.d.createElement ('canvas');
			c.c = c.getContext ('2d');
			c.d = true;
			c.ff = 'monospace';
			c.z = 0;

			c.a = function () { c.h (g.w.h); c.w (g.w.w); g.c.d = true; };
			c.b = function (c) { g.c.style.background = c; };
			c.fs = function (o) {
				var fs = o.h || c.h () * 0.5;
				g.c.c.font = fs + 'px ' + c.ff;

				var w = g.c.c.measureText (o.t).width;
				var W = o.w * c.w ();
				while (Math.abs (w - W) > 5) {
					fs = (w < W) ? fs * 1.6 : fs * 0.8;
					g.c.c.font = fs + 'px ' + c.ff;
					w = g.c.c.measureText (o.t).width;
				};
				return fs;
			};
			c.h = function (h) { if (h) c.height = h; else return c.height; };
			c.w = function (w) { if (w) c.width = w; else return c.width; };
			c.wipe = function (o, d) {
				var s = [];
				for (var i = g.s.length; i--;) {
					for (var k in o) {
						if (o[k] != g.s[i][k]) s.push (g.s[i]);
					};
				};
				g.s = s;
				if (d) g.c.d = true;
			};

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
			d.type = (d.a != undefined) ? 'line' : d.type;
			d.type = (d.i != undefined) ? 'image' : d.type;
			d.type = (d.path != undefined) ? 'path' : d.type;
			d.type = (d.r) ? 'ring' : d.type;
			d.type = (d.t) ? 'text' : d.type;
			d.z = d.z || 0; g.c.z = (d.z > g.c.z) ? d.z : g.c.z;

			g.c.d = d.d || false;
			g.s.push (d);
		};

		if (g.c.d) {
			g.c.c.clearRect (0, 0, g.c.w (), g.c.h ());
			for (var z = 0; z <= g.c.z; z++) {
				for (var id = 0; id < g.s.length; id++) {
					var c = g.s[id];
					if (c.z == z) {
						var a = Math.floor (c.a * g.c.w ());
						var b = Math.floor (c.b * g.c.h ());
						var cos = c.cos || 2 * Math.PI;
						var h = Math.floor (c.h * g.c.h ());
						var r = Math.floor (c.r * Math.min (g.c.h (), g.c.w ()));
						var sin = c.sin || 0;
						var w = Math.floor (c.w * g.c.w ());
						var x = Math.floor (c.x * g.c.w ());
						var y = Math.floor (c.y * g.c.h ());

						if (c.f) g.c.c.fillStyle = c.f;
						if (c.lw) g.c.c.lineWidth = Math.floor (c.lw * Math.min (g.c.h (), g.c.w ()));
						if (c.s) g.c.c.strokeStyle = c.s;

						switch (c.type) {
							case 'box':
								if (c.f) g.c.c.fillRect (x, y, w, h);
								if (c.s) g.c.c.strokeRect (x, y, w, h);
							break;

							case 'image':
								if (w) g.c.c.drawImage (c.i, x, y, w, h); else g.c.c.drawImage (c.i, x, y);
							break;

							case 'line':
								g.c.c.beginPath (); g.c.c.moveTo (a, b); g.c.c.lineTo (x, y);
								if (c.f) g.c.c.fill (); if (c.s) g.c.c.stroke ();
							break;

							case 'path':
								if (c.path == 'begin') {
									g.c.c.beginPath ();
									g.c.c.moveTo (a, b); g.c.c.lineTo (x, y);
								};
								if (c.path == true) {
									g.c.c.lineTo (a, b); g.c.c.lineTo (x, y);
								};
								if (c.path == 'end') {
									g.c.c.lineTo (a, b); g.c.c.lineTo (x, y);
									g.c.c.closePath ();
								 	if (c.f) g.c.c.fill (); if (c.s) g.c.c.stroke ();
								};
							break;

							case 'ring':
								g.c.c.beginPath (); g.c.c.arc (x, y, r, sin, cos);
								if (c.f) g.c.c.fill (); if (c.s) g.c.c.stroke ();
							break;

							case 'text':
								if (h || w) { var fs = (w) ? g.c.fs (c) : h; g.c.c.font = fs + 'px ' + g.c.ff; };
								if (c.ta) g.c.c.textAlign = c.ta;
								if (c.tb) g.c.c.textBaseline = c.tb;
								if (c.f) g.c.c.fillText (c.t, x, y);
								if (c.s) g.c.c.strokeText (c.t, x, y);
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
			b.id = b.id || 'button' + g.o.length;

			b.a = b.a || function () { g.w.l = b.id; b.wipe (); };
			b.c = b.c || {};
			b.c.b = b.c.b || '#000'; b.c.ba = b.c.ba || b.c.b; b.c.bd = b.c.b;
			b.c.t = b.c.t || '#fff'; b.c.ta = b.c.ta || b.c.t; b.c.td = b.c.t;
			b.in = b.in || function () {};
			b.out = b.out || function () {};
			b.over = false;
			b.z = b.z || 0;

			b.action = function () { if (b.detect ()) { b.a (); }; };

			b.active = function () {
				if (b.detect ()) {
					if (!b.over) {
						b.over = true;
						if (b.c.ba) b.c.b = b.c.ba;
						if (b.c.ta) b.c.t = b.c.ta;
						if (b.c.ba || b.c.ta) b.s ();
						g.c.style.cursor = 'pointer'; b.in ();
					};
				}
				else {
					if (b.over) {
						b.over = false;
						if (b.c.ba) b.c.b = b.c.bd;
						if (b.c.ta) b.c.t = b.c.td;
						if (b.c.ba || b.c.ta) b.s ();
						g.c.style.cursor = 'default'; b.out ();
					};
				}};

			b.detect = function () {
				var x = g.e.x || g.e.clientX; var y = g.e.y || g.e.clientY;
					x = x / g.c.w () + 0.5 * b.w; y = y / g.c.h () + 0.5 * b.h;
				return ((x >= b.x) && (x <= b.x + b.w) && (y >= b.y) && (y <= b.y + b.h));
			};

			b.s = function () {
				g.c.wipe ({ id: b.id });
				b.h = (b.hk) ? (b.hk * b.w * g.c.w ()) / g.c.h () : b.h;
				b.w = (b.wk) ? (b.wk * b.h * g.c.h ()) / g.c.w () : b.w;
				g.d ({ f: b.c.b, h: b.h, id: b.id, w: b.w, x: b.x - 0.5 * b.w, y: b.y - 0.5 * b.h, z: b.z });
				g.d ({ f: b.c.t, h: b.h, id: b.id, t: b.t, ta: 'center', tb: 'middle', w: b.w * 0.6, x: b.x, y: b.y, z: b.z + 1 });
				g.c.d = true;
			};

			b.wipe = function () {
				g.c.style.cursor = 'default';
				g.w.wipe ({ id: b.id });
				g.c.wipe ({ id: b.id }, true);
			};

			b.u = function () { switch (g.e.type) {
				case 'mousedown': b.action (); break;
				case 'mousemove': b.active ();  break;
				case 'resize': b.s (); break;
			};};

			b.s ();
			g.o.push (b);
		},

		set p (p)
		{
			p.id = p.id || 'player' + g.o.length;

			p.acc = 0.05; p.spd = p.spd || 0.001;
			p.h = p.h || 0.075; p.hd = p.h; p.w = p.w || 0.05;
			p.i = p.i || g.i.p;
			p.move = false;
			p.step = 0;
			p.steps = [g.i.p, g.i.p_m, g.i.p_m_s];
			p.vx = 0.5; p.vy = 0.5;
			p.x = p.x || 0.5; p.y = p.y || 0.5;
			p.z = p.z || 1;

			p.m = {
				d: function () {
					if (p.y < p.vy) {
						p.move = (Math.abs (p.y - p.vy) > 0.001);
						p.y += (p.y < 0.9) ? p.spd + Math.abs (p.y - p.vy) * p.acc : 0;
						p.s ();
					};
				},

				l: function () {
					if (p.x > p.vx) {
						p.move = (Math.abs (p.x- p.vx) > 0.001);
						p.x -= (p.x > 0.05) ? p.spd + Math.abs (p.x - p.vx) * p.acc : 0;
						p.s ();
					};
				},

				r: function () {
					if (p.x < p.vx) {
						p.move = (Math.abs (p.x - p.vx) > 0.001);
						p.x += (p.x < 0.95) ? p.spd + Math.abs (p.x - p.vx) * p.acc : 0;
						p.s ();
					};
				},

				u: function () {
					if (p.y > p.vy) {
						p.move = (Math.abs (p.y - p.vy) > 0.001);
						p.y -= (p.y > 0.1) ? p.spd + Math.abs (p.y - p.vy) * p.acc : 0;
						p.s ();
					};
				},

				upd: function () {
					if (p.move) {
						p.i = p.steps[Math.floor (p.step)];
						p.step = (p.step > p.steps.length - 1) ? 0: p.step + 0.9;
						p.move = false;
					};
					p.m.d (); p.m.l (); p.m.r (); p.m.u ();
				}
			};

			p.vxy = function () {
				p.vx = g.e.x / g.c.w (); p.vy = g.e.y / g.c.h ();
			};

			p.s = function () {
				g.c.wipe ({ id: p.id });
				p.h = (p.hk) ? (p.hk * p.w * g.c.w ()) / g.c.h () : p.h;
				p.w = (p.wk) ? (p.wk * p.h * g.c.h ()) / g.c.w () : p.w;
				g.d ({h: p.h, i: p.i, id: p.id, w: p.w, x: p.x - 0.5 * p.w, y: p.y - 0.5 * p.h, z: p.z});
				g.c.d = true;
			};

			p.u = function () { switch (g.e.type) {
				case 'mousemove': p.vxy (); break;
				case 'resize': p.s (); break;
				case 'tick': p.m.upd (); break;
			};};

			p.s ();
			g.o.push (p);
		},

		set r (b) {
			b.id = b.id || 'round' + g.o.length;

			b.a = b.a || function () { g.w.l = b.id; b.wipe (); };
			b.c = b.c || {};
			b.c.b = b.c.b || '#000'; b.c.ba = b.c.ba || b.c.b; b.c.bd = b.c.b;
			b.c.t = b.c.t || '#fff'; b.c.ta = b.c.ta || b.c.t; b.c.td = b.c.t;
			b.in = b.in || function () {};
			b.out = b.out || function () {};
			b.over = false;
			b.z = b.z || 0;

			b.action = function () { if (b.detect ()) { b.a (); }; };

			b.active = function () {
				if (b.detect ()) {
					if (!b.over) {
						b.over = true;
						if (b.c.ba) b.c.b = b.c.ba;
						if (b.c.ta) b.c.t = b.c.ta;
						if (b.c.ba || b.c.ta) b.s ();
						g.c.style.cursor = 'pointer'; b.in ();
					};
				}
				else {
					if (b.over) {
						b.over = false;
						if (b.c.ba) b.c.b = b.c.bd;
						if (b.c.ta) b.c.t = b.c.td;
						if (b.c.ba || b.c.ta) b.s ();
						g.c.style.cursor = 'default'; b.out ();
					};
				}};

			b.detect = function () {
				var x = g.e.x || g.e.clientX; var y = g.e.y || g.e.clientY;
				var	bx = b.x * g.c.w (); var by = b.y * g.c.h ();
				var r = Math.sqrt (Math.pow (x - bx, 2) + Math.pow (y - by, 2)) / Math.min (g.c.h (), g.c.w ());
				return (r <= b.r);
			};

			b.s = function () {
				g.c.wipe ({ id: b.id });
				b.h = 2 * b.r; b.w = b.r;
				b.h = (b.hk) ? (b.hk * b.w * g.c.w ()) / g.c.h () : b.h;
				b.w = (b.wk) ? (b.wk * b.h * g.c.h ()) / g.c.w () : b.w;
				g.d ({ f: b.c.b, h: b.r, id: b.id, r: b.r, w: b.r, x: b.x, y: b.y, z: b.z });
				if (b.i) g.d ({ h: b.h, i: b.i, id: b.id, w: b.w, x: b.x - 0.5 * b.w, y: b.y - 0.5 * b.h, z: b.z + 1 });
				if (b.t) g.d ({ f: b.c.t, h: b.h, id: b.id, t: b.t, ta: 'center', tb: 'middle', w: b.w * 0.6, x: b.x, y: b.y, z: b.z + 1 });
				g.c.d = true;
			};

			b.wipe = function () {
				g.c.style.cursor = 'default';
				g.w.wipe ({ id: b.id });
				g.c.wipe ({ id: b.id }, true);
			};

			b.u = function () { switch (g.e.type) {
				case 'mousedown': b.action (); break;
				case 'mousemove': b.active ();  break;
				case 'resize': b.s (); break;
			};};

			b.s ();
			g.o.push (b);
		}
	},

	i: {
		set l (l) {
			for (var id in l) {
				var i = new Image ();
					i.src = l[id];
				g.i[id] = i;
			};
		}
	},

	set l (l) { window.onload = function () { g.w (); g.c (); g.e (); l ();}; },

	lvl: {},
	o: [],

	p: {
		lvl: 'start',
		option: false
	},

	s: [],

	w: function () {
		var w = window;
			w.d = w.document;
			w.d.b = w.d.body;
			w.h = w.innerHeight;
			w.i = 40;
			w.t = 0;
			w.w = w.innerWidth;

		Object.defineProperties (w, {
			'l': { set: function (l) { w.console.log (l); }},
			'ontick': { set: function (f) { w.c = w.setInterval (function () { f ({i: w.i, t: w.t, type: 'tick' }); w.t += w.i; }, w.i); }},
		});

		w.u = function () { switch (g.e.type) {
			case 'resize': w.h = w.innerHeight; w.w = w.innerWidth; break;
		};};

		w.wipe = function (o, d) {
			for (var i = g.o.length; i--;) {
				for (var k in o) {
					if (o[k] == g.o[i][k]) g.o.splice (i, 1);
				};
			};
			if (d) g.c.d = true;
		};

		delete g.w;
		g.w = w;
	},

	wipe: function (o) {
		if (o) {
			g.c.wipe (o); g.w.wipe (o); g.c.d = true; g.c.style.cursor = 'default';
		} else {
			g.o = []; g.s = []; g.c.d = true; g.c.style.cursor = 'default';
		};
	},

	u: function () {
		g.w.u ();
		g.c.u ();
		for (var i = g.o.length; i--;) if (g.o[i]) g.o[i].u ();
	}
};

g.i.l = {
	bg: 'bg.svg',
	p: 'p.svg', p_b: 'p_b.svg', p_m: 'p_m.svg', p_m_s: 'p_m_s.svg',
	option: 'option.svg'
};

g.l = function () {
	g.lvl.start ();
};

g.lvl.begin = function () {
	g.wipe ();
	g.p.lvl = 'begin';
	g.w.document.body.style.backgroundImage = 'url(bg.svg)';
	g.c.b ('transparent'); g.c.style.cursor = 'none';
	g.g.r = { a: g.lvl.option, c: { b: 'transparent', ba: 'transparent' }, i: g.i.option, r: 0.025, wk: 1, x: 0.96, y: 0.05, z: 1 };
	g.g.p = { wk: 0.4 };
};

g.lvl.option = function () {
	if (g.p.option) {
		g.p.option = false;
		g.wipe ({ id: 'option' });
	} else {
		g.c.b ('#fff');
		g.wipe ();
		g.p.option = true;
		g.g.b = { a: function () { g.p.option = false; g.lvl[g.p.lvl] (); g.e = {}; }, c: { b: '#aaa', ba: '#ddd', t: '#eee', ta: '#fff' }, h: 0.1, t: 'НАЗАД', wk: 3, x: 0.5, y: 0.3, z: 1 };
		g.g.b = { a: function () { g.p.option = false; g.lvl.start (); g.e = {}; }, c: { b: '#aaa', ba: '#ddd', t: '#eee', ta: '#fff' }, h: 0.1, t: 'ВЫЙТИ', wk: 3, x: 0.5, y: 0.425, z: 1 };
	};
};

g.lvl.start = function () {
	g.wipe ();
	g.p.lvl = 'start';
	g.c.b ('#fff');
	g.g.b = { a: g.lvl.begin, c: { b: '#aaa', ba: '#ddd', t: '#eee', ta: '#fff' }, hk: 0.5, t: 'PLAY', w: 0.2, x: 0.5, y: 0.5, z: 1 };
	g.g.r = { a: g.lvl.option, c: { b: 'transparent', ba: 'transparent' }, i: g.i.option, r: 0.025, wk: 1, x: 0.96, y: 0.05, z: 1 };
};

