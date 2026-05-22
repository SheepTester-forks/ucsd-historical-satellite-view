var J = !0,
  L = null,
  M = !1;
window.init = ba;
window.centerDrawing = ca;
window.remoteToggleHighlight = da;
window.toggleHighlight = ea;
window.toggleAllHighlights = fa;
window.toggleOneHighlight = ga;
window.simulateClick = N;
window.toggleLayer = ha;
window.checkPinOverlap = ia;
window.revealMenu = ja;
window.zoomImage = O;
window.keyLiteClick = ka;
window.toggleSection = la;
window.moveKeyMap = ma;
window.toggleBackground = na;
window.toggleLabel = oa;
window.search = pa;
window.hideBubble = qa;
window.setPrintLink = ra;
window.moveLeftConsole = sa;
function ba(
  a,
  b,
  d,
  c,
  e,
  f,
  r,
  p,
  g,
  l,
  k,
  m,
  s,
  j,
  E,
  q,
  n,
  x,
  K,
  S,
  Ma,
  y,
  Na,
  Oa,
  aa,
) {
  d = document.getElementById("leftConsoleButton");
  x = document.getElementById("rightConsoleButton");
  P(document, "ondragstart\x3dreturnFalse");
  P(
    document,
    "mouseup\x3dmouseUp,touchend\x3dmouseUp,touchcancel\x3dmouseUp,mousemove\x3dcontinueMove,touchmove\x3dcontinueMove",
  );
  document.getElementById("keyLite") &&
    (P(
      document.getElementById("keyLite"),
      "mousedown\x3dsetClickPos,touchstart\x3dsetClickPos",
    ),
    P(
      document.getElementById("keyLiteShade"),
      "mousedown\x3dsetClickPos,touchstart\x3dsetClickPos",
    ));
  d && P(d, "click\x3dmoveLeftConsole");
  x && P(x, "click\x3dmoveRightConsole");
  P(
    document.getElementById("tabMenu_1_1_off"),
    "mouseover\x3dtabOver,mouseout\x3dtabOut",
  );
  window.module = "pubMaps";
  window.pointerMode = "Nav";
  window.pointerSubMode = "Nav";
  window.lastPointerSubMode = "Nav";
  window.clickposx = 0;
  window.clickposy = 0;
  window.startingPopup = Oa;
  window.currentPopup = 0;
  window.startingPinCount = 0;
  window.scrollstartleft = 0;
  window.scrollstarttop = 0;
  window.ismousedown = M;
  window.ismousedownkey = M;
  window.keyliteclickoff = M;
  window.maxleft = 0;
  window.maxtop = 0;
  window.path = r;
  window.base = p;
  window.leftConsoleState = "open";
  window.keyMapState = "open";
  window.rightConsoleState = "closed";
  "open" == keyMapState && -1 < navigator.appVersion.indexOf("Mobile") && ma();
  dojo.require("dojox.gfx");
  window.maxZoom = g;
  window.noZoom = l;
  0 != k && (window.startingZoom = k);
  window.xy = m;
  window.tile = f;
  window.ext = s + "?";
  window.mkey = e;
  window.ImageSrc = {};
  window.ImageGet = {};
  window.countX = {};
  window.countY = {};
  window.zoomInfo = {};
  window.layerInfo = {};
  window.backgroundInfo = {};
  window.backgroundZoom = {};
  window.labelInfo = {};
  window.labelZoom = {};
  window.layersOn = J;
  window.canvases = [];
  window.canvasDrawn = [];
  window.shapes = {};
  window.shadeSection = "none";
  window.placeInfo = {};
  window.centerInfo = {};
  window.mapWidth = S;
  window.mapHeight = Ma;
  window.infoTypes = {};
  window.overlays = Q(String(Na), ",");
  for (e = 0; e < j.length; e++)
    zoomInfo[1 * j[e][0] + 1 + "-" + j[e][1]] = {
      height: j[e][2],
      width: j[e][3],
    };
  for (e = 0; e < E.length; e++)
    layerInfo[e] = {
      name: E[e][0],
      e: E[e][1],
      toggle: E[e][2],
      b: E[e][3],
      q: E[e][4],
      h: E[e][5],
    };
  for (e = 0; e < q.length; e++)
    backgroundInfo[e] = {
      name: q[e][0],
      c: q[e][1],
      visible: q[e][2],
      offsetX: q[e][3],
      offsetY: q[e][4],
      h: q[e][11],
      r: q[e][5],
      j: q[e][6],
      i: q[e][7],
      I: q[e][8],
      K: q[e][9],
      J: q[e][10],
    };
  for (e = 0; e < n.length; e++)
    ((j = n[e][1] + 1),
      (backgroundZoom[n[e][0] + "-" + j] = {
        height: n[e][2],
        width: n[e][3],
      }));
  for (e = 0; e < y.length; e++)
    centerInfo[y[e][0]] = { f: y[e][1], g: y[e][2] };
  for (n = 1; n <= maxZoom; n++) {
    y = n;
    q = E = 0;
    "Maps" == module || "pubMaps" == module
      ? ((E = zoomInfo[y + "-Base"].width), (q = zoomInfo[y + "-Base"].height))
      : ((E = zoomInfo[y].width), (q = zoomInfo[y].height));
    j = document.createElement("div");
    j.setAttribute("id", "drawingWindow-" + y);
    j.setAttribute("name", "drawingWindow-" + y);
    j.style.position = "absolute";
    j.style.width = "" + E + "px";
    j.style.height = "" + q + "px";
    j.style.MozUserSelect = "none";
    "sheets" == module && (j.style.border = "1px solid");
    j.style.visibility = 1 == y ? "visible" : "hidden";
    j.style.top = "0px";
    j.style.left = "0px";
    j.style.cursor = "url('/Media/Cursors/openhand_8_8.cur'), default";
    j.style.zIndex = 0;
    window.addEventListener
      ? (j.addEventListener("mousedown", ta, M),
        j.addEventListener("touchstart", ta, M))
      : (j.onmousedown = ta);
    document.getElementById("viewerWindow").appendChild(j);
    window.addEventListener &&
      (j.addEventListener("DOMMouseScroll", ua, M),
      j.addEventListener("gesturestart", va, M),
      j.addEventListener("gesturechange", wa, M),
      j.addEventListener("gestureend", xa, M));
    j.onmousewheel = ua;
    window.zoom = 1;
    if ("Maps" == module || "Floorplans" == module || "pubMaps" == module) {
      var I = void 0;
      for (I in layerInfo)
        1 == layerInfo[I].toggle &&
          ((j = document.createElement("div")),
          j.setAttribute("id", "drawingWindow-" + layerInfo[I].name + "-" + y),
          j.setAttribute("name", "layer"),
          (j.style.position = "absolute"),
          "Maps" == module || "pubMaps" == module
            ? ((j.style.width =
                "" + zoomInfo[y + "-" + layerInfo[I].b].width + "px"),
              (j.style.height =
                "" + zoomInfo[y + "-" + layerInfo[I].b].height + "px"))
            : ((j.style.width = "" + E + "px"),
              (j.style.height = "" + q + "px")),
          (j.style.zIndex = layerInfo[I].L),
          (j.style.visibility =
            1 == y && 1 == layerInfo[I].e ? "visible" : "hidden"),
          (j.style.top = "0px"),
          (j.style.left = "0px"),
          document.getElementById("drawingWindow-" + y).appendChild(j));
    }
    E = void 0;
    E = 0 == thumbOffsetY && 0 == thumbOffsetX ? 0 : 1;
    if ("Maps" == module || "pubMaps" == module) {
      for (I in backgroundInfo)
        ((j = document.createElement("div")),
          j.setAttribute(
            "id",
            "drawingWindow-" + backgroundInfo[I].name + "-" + y,
          ),
          j.setAttribute("name", "background"),
          (j.style.position = "absolute"),
          "undefined" == typeof backgroundZoom[backgroundInfo[I].c + "-" + y] &&
            (backgroundZoom[backgroundInfo[I].c + "-" + y] = {
              height: 0,
              width: 0,
            }),
          (j.style.width =
            "" + backgroundZoom[backgroundInfo[I].c + "-" + y].width + "px"),
          (j.style.height =
            "" + backgroundZoom[backgroundInfo[I].c + "-" + y].height + "px"),
          (j.style.zIndex = -2),
          1 == y && 1 == backgroundInfo[I].visible
            ? ((j.style.visibility = "visible"),
              0 == E &&
                ((window.thumbOffsetY =
                  backgroundInfo[I].i * backgroundInfo[I].offsetY),
                (window.thumbOffsetX =
                  backgroundInfo[I].j * backgroundInfo[I].offsetX),
                (E = 1)))
            : (j.style.visibility = "hidden"),
          (newTop =
            backgroundZoom[backgroundInfo[I].c + "-" + y].height *
            backgroundInfo[I].offsetY),
          (newLeft =
            backgroundZoom[backgroundInfo[I].c + "-" + y].width *
            backgroundInfo[I].offsetX),
          (j.style.top = newTop + "px"),
          (j.style.left = newLeft + "px"),
          document.getElementById("drawingWindow-" + y).appendChild(j));
      for (I in labelInfo)
        ((j = document.createElement("div")),
          j.setAttribute("id", "drawingWindow-" + labelInfo[I].name + "-" + y),
          j.setAttribute("name", "label"),
          (j.style.position = "absolute"),
          "undefined" == typeof labelZoom[labelInfo[I].c + "-" + y] &&
            (labelZoom[labelInfo[I].c + "-" + y] = { height: 0, width: 0 }),
          (j.style.width =
            "" + labelZoom[labelInfo[I].d + "-" + y].width + "px"),
          (j.style.height =
            "" + labelZoom[labelInfo[I].d + "-" + y].height + "px"),
          (j.style.zIndex = 1001),
          (j.style.visibility =
            1 == y && 1 == labelInfo[I].visible ? "visible" : "hidden"),
          (newTop =
            labelZoom[labelInfo[I].d + "-" + y].height * labelInfo[I].offsetY),
          (newLeft =
            labelZoom[labelInfo[I].d + "-" + y].width * labelInfo[I].offsetX),
          (j.style.top = newTop + "px"),
          (j.style.left = newLeft + "px"),
          document.getElementById("drawingWindow-" + y).appendChild(j));
    }
    0 == E && ((window.thumbOffsetX = 0), (window.thumbOffsetY = 0));
    y = n;
    "Maps" == module || "pubMaps" == module
      ? ((countX[y] = Math.ceil(zoomInfo[y + "-Base"].width / tile)),
        (countY[y] = Math.ceil(zoomInfo[y + "-Base"].height / tile)))
      : ((countX[y] = Math.ceil(zoomInfo[y].width / tile)),
        (countY[y] = Math.ceil(zoomInfo[y].height / tile)));
  }
  I = zoomInfo[maxZoom + "-Base"].width;
  n = zoomInfo[maxZoom + "-Base"].height;
  y = document.createElement("div");
  y.setAttribute("id", "shapeWindow");
  y.style.position = "absolute";
  y.style.width = "" + I + "px";
  y.style.height = "" + n + "px";
  y.style.zIndex = -1;
  document.getElementById("drawingWindow-1").appendChild(y);
  window.shapeWindow = y;
  window.shapeSurface = dojox.gfx.createSurface(y, I, n);
  shapeSurface.rawNode.style.zIndex = -1;
  "undefined" == typeof tabRows && (window.F = {});
  "undefined" == typeof tabRowTabs && (window.D = {});
  "undefined" == typeof tabSelectedTab && (window.H = {});
  "undefined" == typeof tabSelectedRow && (window.G = {});
  tabSelectedTab.tabMenu = "1_1";
  tabSelectedRow.tabMenu = "1";
  n = I = 1;
  for (j = y = 0; document.getElementById("tabMenu_" + I); ) {
    for (y++; document.getElementById("tabMenu_" + I + "_" + n); ) (j++, n++);
    tabRowTabs["tabMenu_" + y] = j;
    I++;
    j = 0;
    n = 1;
  }
  tabRows.tabMenu = y;
  document.getElementById("tabMenu_1_1_content").style.display = "block";
  I = 1;
  0 == I && (I = tabRows.tabMenu);
  n = document.getElementById("tabMenu_" + I)
    ? document.getElementById("tabMenu_" + I)
    : 0;
  0 == n &&
    ((n = document.getElementById("tabMenu_1")
      ? document.getElementById("tabMenu_1")
      : 0),
    (I = 1));
  0 != n &&
    ((document.getElementById(
      "tabMenu_" + tabSelectedRow.tabMenu,
    ).style.display = "none"),
    (document.getElementById("tabMenu_" + I).style.display = "block"),
    (tabSelectedRow.tabMenu = I));
  ya("tabMenu", 1, 1);
  ya("tabMenu", 1, aa);
  R();
  za("bldgDiv");
  za("mapDiv");
  "closed" == c && sa();
  "closed" == b && ma();
  0 < a && (document.getElementById("sheetsDiv").scrollTop = a);
  if (noZoom) {
    b = document.getElementById("viewerWindow");
    a = b.clientHeight;
    b = b.clientWidth;
    c = 1e8;
    for (I = aa = 1; I <= maxZoom; I++)
      ((y = document.getElementById("drawingWindow-" + I)),
        (n = y.clientHeight),
        (j = y.clientWidth),
        (y = Math.abs(n - a) + Math.abs(j - b)),
        y < c && n < a && j < b && ((c = y), (aa = I)));
    O(aa, 0, 0);
  } else O(startingZoom, 0, 0);
  ca();
  window.onresize = R;
  window.onorientationchange = R;
  document.getElementById("linkMenu").style.visibility = "hidden";
  document.getElementById("embedMenu").style.visibility = "hidden";
}
function Aa(a) {
  if ("maps" == a)
    for (var b in backgroundInfo)
      1 == backgroundInfo[b].visible &&
        (document.getElementById("background-" + backgroundInfo[b].c).src =
          "/Media/Icons/RadioButton_16x16.gif");
  if ("bldg" == a) {
    a = "bldgInfo.htm?mkey\x3d" + mkey;
    var d = Ba();
    d.open("GET", a, J);
    d.onreadystatechange = function () {
      if (4 == d.readyState)
        if (200 == d.status) {
          var a = d.responseText;
          if (a != L) {
            var a = Q(String(a), "~"),
              b = eval("(" + a[0] + ")");
            window.geoJSON = eval("(" + a[1] + ")");
            for (a = 0; a < b.length; a++)
              placeInfo[a] = {
                a: b[a][0],
                type: b[a][1],
                code: b[a][2],
                color: b[a][3],
                k: b[a][4],
              };
            b = 0;
            for (a in placeInfo) {
              var f = 1,
                r;
              for (r in infoTypes)
                placeInfo[a].type == infoTypes[r].type && (f = 0);
              f && ((infoTypes[b] = { type: placeInfo[a].type }), b++);
            }
            for (a in overlays)
              document.getElementById(overlays[a] + "-Off") &&
                N(overlays[a] + "-Off");
          }
        } else
          404 == d.status
            ? alert("Request URL does not exist")
            : alert("Error: status code is " + d.status);
    };
    d.send(L);
  }
}
function za(a) {
  var b = a + ".htm" + ("?mkey\x3d" + mkey),
    d = Ba();
  d.open("GET", b, J);
  d.onreadystatechange = function () {
    if (4 == d.readyState)
      if (200 == d.status) {
        var b = d.responseText;
        b != L &&
          document.getElementById(a) &&
          ((document.getElementById(a).innerHTML = b),
          "bldgDiv" == a ? Aa("bldg") : "mapDiv" == a && Aa("maps"),
          R());
      } else
        404 == d.status
          ? alert("Request URL does not exist")
          : alert("Error: status code is " + request2.status);
  };
  d.send(L);
}
function sa() {
  var a = document.getElementById("leftConsole"),
    b = document.getElementById("drawingWindow-" + zoom),
    d = document.getElementById("leftConsoleButton"),
    c = "",
    e = "",
    f = "",
    r = "";
  "closed" == leftConsoleState
    ? ((c = "300px"),
      (e = "url(/Media/Bullets/BlueArrowsClose_9x16.gif)"),
      (f = "none"),
      (r = "#999999 1px solid"),
      (leftConsoleState = "open"))
    : ((c = "0px"),
      (e = "url(/Media/Bullets/BlueArrowsOpen_9x16.gif)"),
      (r = f = "#999999 1px solid"),
      (leftConsoleState = "closed"));
  x1 = a.clientWidth;
  a.style.width = c;
  a = b.offsetLeft - a.clientWidth + x1;
  c = b.offsetTop + 1;
  "closed" == leftConsoleState && (a += 2);
  T(b, a, c);
  d.style.backgroundImage = e;
  d.style.borderLeft = f;
  d.style.borderTop = r;
  R();
}
function ma(a) {
  a || (a = window.event);
  a.cancelBubble = J;
  a.stopPropagation && a.stopPropagation();
  a = document.getElementById("thumbBorder");
  var b = document.getElementById("thumb"),
    d = document.getElementById("thumbBorderImageSE"),
    c = document.getElementById("thumbBorderImageNW"),
    e = b.clientWidth,
    b = b.clientHeight,
    f = a.clientWidth,
    r = a.clientHeight,
    p = 0,
    g = 0;
  "closed" == keyMapState
    ? ((p = (b - r) / 2 - 2),
      (g = (e - f) / 2 - 2),
      (c.style.visibility = "hidden"),
      (d.style.visibility = "visible"),
      (keyMapState = "open"))
    : ((p = (b - r) / 2 - b + 12),
      (g = (e - f) / 2 - e + 12),
      (c.style.visibility = "visible"),
      (d.style.visibility = "hidden"),
      (keyMapState = "closed"));
  a.style.bottom = p + "px";
  a.style.right = g + "px";
}
function R() {
  var a = 0,
    b = 0,
    d = Ca(),
    c = document.getElementById("viewer"),
    e = document.getElementById("viewerWindow"),
    f = document.getElementById("leftConsole"),
    r = document.getElementById("rightConsole"),
    p = document.getElementById("infoStrip"),
    g = document.getElementById("leftConsoleButton"),
    l = 0,
    k = 0,
    m = document.getElementById("bldgDiv");
  document.getElementById("bldgInnerDiv") &&
    ((k = 1), (l = document.getElementById("bldgInnerDiv")));
  var s = 0,
    j = 0,
    E = document.getElementById("mapDiv");
  document.getElementById("mapInnerDiv") &&
    ((j = 1), (s = document.getElementById("mapInnerDiv")));
  var q = document.getElementById("tabMenu_1"),
    n = document.getElementById("tabMenu_Menu"),
    x = document.getElementById("tabMenu_Content");
  if ("number" == typeof window.innerWidth)
    ((a = window.innerWidth), (b = window.innerHeight));
  else if (
    document.documentElement &&
    (document.documentElement.clientWidth ||
      document.documentElement.clientHeight)
  )
    ((a = document.documentElement.clientWidth),
      (b = document.documentElement.clientHeight));
  else if (
    document.body &&
    (document.body.clientWidth || document.body.clientHeight)
  )
    ((a = document.body.clientWidth), (b = document.body.clientHeight));
  var K = Da(c);
  400 > b - K.y - 20
    ? ((c.style.height = "400px"),
      (e.style.height = "368px"),
      (f.style.height = "400px"),
      (r.style.height = "400px"))
    : ((c.style.height = b - K.y - d[1] - 20 + "px"),
      (e.style.height = b - K.y - d[1] - 20 - 32 + "px"),
      (f.style.height = b - K.y - d[1] - 20 + "px"),
      (r.style.height = b - K.y - d[1] - 20 + "px"));
  a = a - f.clientWidth - r.clientWidth - 60;
  0 > a && (a = 0);
  e.style.width = a + "px";
  p.style.width = a + "px";
  e = Da(e);
  "closed" == leftConsoleState
    ? ((g.style.top = e.y + d[1] + "px"), (g.style.left = e.x + "px"))
    : ((g.style.top = e.y + d[1] + "px"), (g.style.left = e.x - 1 + "px"));
  g = d = 0;
  "number" == typeof window.innerWidth
    ? ((d = f.clientHeight - n.clientHeight - 1),
      (g = f.clientHeight - q.clientHeight - 16))
    : ((d = f.clientHeight - n.clientHeight - 3),
      (g = f.clientHeight - q.clientHeight - 19));
  0 > d && (d = 0);
  x.style.height = d + "px";
  0 > g && (g = 0);
  m.style.height = g + "px";
  E.style.height = g + "px";
  k &&
    (m.clientHeight < l.clientHeight && "open" == leftConsoleState
      ? ((m.style.overflowX = "hidden"),
        (m.style.overflowY = "scroll"),
        (m.style.paddingRight = "20px"))
      : ((m.style.overflowX = "hidden"),
        (m.style.overflowY = "hidden"),
        (m.style.paddingRight = "0px")));
  j &&
    (E.clientHeight < s.clientHeight && "open" == leftConsoleState
      ? ((E.style.overflowX = "hidden"),
        (E.style.overflowY = "scroll"),
        (E.style.paddingRight = "20px"))
      : ((E.style.overflowX = "hidden"),
        (E.style.overflowY = "hidden"),
        (E.style.paddingRight = "0px")));
  document.getElementById("keyLite") && Ea();
  U();
  V();
}
function U() {
  var a = document.getElementById("linkDiv"),
    b = document.getElementById("embedDiv"),
    d = document.getElementById("viewerWindow"),
    c = document.getElementById("drawingWindow-" + zoom),
    e =
      Math.round(100 * ((d.clientHeight / 2 - c.offsetTop) / c.clientHeight)) /
      100,
    d =
      Math.round(100 * ((d.clientWidth / 2 - c.offsetLeft) / c.clientWidth)) /
      100,
    c = "",
    f = 0,
    r;
  for (r in layerInfo)
    1 == layerInfo[r].e &&
      (0 == f
        ? ((c = layerInfo[r].name), (f = 1))
        : (c = c + "," + layerInfo[r].name));
  0 == f && (c = "None");
  f = 0;
  for (r in backgroundInfo)
    1 == backgroundInfo[r].visible && (f = backgroundInfo[r].c);
  var p = 0;
  for (r in labelInfo) 1 == labelInfo[r].visible && (p = labelInfo[r].d);
  var g = Q(String(tabSelectedTab.tabMenu), "_"),
    l = "",
    k = 0,
    m = [],
    s = 0;
  for (r in infoTypes)
    if (document.getElementById(infoTypes[r].type + "-All-On"))
      0 == k
        ? ((l = infoTypes[r].type + "-All"), (k = 1))
        : (l = "" + l + "," + infoTypes[r].type + "-All");
    else
      for (var j in placeInfo)
        if (
          placeInfo[j].type == infoTypes[r].type &&
          document.getElementById(
            infoTypes[r].type + "-" + placeInfo[j].code + "-On",
          )
        ) {
          var E = 0,
            q;
          for (q in m)
            m[q] == infoTypes[r].type + "-" + placeInfo[j].code && (E = 1);
          E ||
            (0 == k
              ? ((l =
                  "" +
                  infoTypes[r].type +
                  "-" +
                  placeInfo[j].code.replace("%", "%25")),
                (k = 1))
              : (l =
                  l +
                  "," +
                  infoTypes[r].type +
                  "-" +
                  placeInfo[j].code.replace("%", "%25")),
            (m[s] = infoTypes[r].type + "-" + placeInfo[j].code),
            s++);
        }
  0 == k && (l = "None");
  r = "";
  0 != currentPopup &&
    (r = "\x26openPin\x3d" + currentPopup.replace("%", "%25"));
  j =
    document.location.protocol +
    "//" +
    document.location.hostname +
    document.location.pathname +
    "?mkey\x3d" +
    mkey +
    "\x26lc\x3d" +
    leftConsoleState +
    "\x26km\x3d" +
    keyMapState +
    "\x26rc\x3d" +
    rightConsoleState +
    "\x26zoom\x3d" +
    zoom +
    "\x26X\x3d" +
    d +
    "\x26Y\x3d" +
    e +
    "\x26layers\x3d" +
    c +
    "\x26background\x3d" +
    f +
    "\x26label\x3d" +
    p +
    "\x26overlays\x3d" +
    l +
    "\x26selectedTab\x3d" +
    g[1] +
    r;
  e =
    "\x3ciframe width\x3d'600' height\x3d'600' frameborder\x3d'0' scrolling\x3d'no' marginheight\x3d'0' marginwidth\x3d'0' src\x3d'" +
    document.location.protocol +
    "//" +
    document.location.hostname +
    document.location.pathname +
    "embed/embed.htm?mkey\x3d" +
    mkey +
    "\x26lc\x3d" +
    leftConsoleState +
    "\x26km\x3d" +
    keyMapState +
    "\x26rc\x3d" +
    rightConsoleState +
    "\x26zoom\x3d" +
    zoom +
    "\x26X\x3d" +
    d +
    "\x26Y\x3d" +
    e +
    "\x26layers\x3d" +
    c +
    "\x26background\x3d" +
    f +
    "\x26label\x3d" +
    p +
    "\x26overlays\x3d" +
    l +
    r +
    "'\x3e\x3c/iframe\x3e";
  e = e.replace("default.htm", "");
  a && (a.value = j);
  b && (b.value = e);
}
function ja(a) {
  targ = document.getElementById(a + "Button");
  var b;
  b = targ;
  var d = 0,
    c = 0;
  if (b.offsetParent) {
    do ((d += b.offsetLeft), (c += b.offsetTop));
    while ((b = b.offsetParent));
  }
  b = [d, c];
  a = document.getElementById(a);
  if ("hidden" == a.style.visibility) {
    var d = W("popupMenu"),
      e;
    for (e in d) d[e].style.visibility = "hidden";
    a.style.visibility = "visible";
    e = b[0] - 5;
    a.style.top = b[1] + targ.clientHeight + 3 + "px";
    a.style.left = e + "px";
  } else a.style.visibility = "hidden";
  U();
}
function ra(a) {
  var b = document.getElementById("viewerWindow"),
    d = document.getElementById("drawingWindow-" + zoom),
    c =
      Math.round(100 * ((b.clientHeight / 2 - d.offsetTop) / d.clientHeight)) /
      100,
    b =
      Math.round(100 * ((b.clientWidth / 2 - d.offsetLeft) / d.clientWidth)) /
      100,
    d = "",
    e = 0,
    f;
  for (f in layerInfo)
    1 == layerInfo[f].e &&
      (0 == e
        ? ((d = layerInfo[f].name), (e = 1))
        : (d = d + "," + layerInfo[f].name));
  0 == e && (d = "None");
  e = 0;
  for (f in backgroundInfo)
    1 == backgroundInfo[f].visible && (e = backgroundInfo[f].c);
  var r = 0;
  for (f in labelInfo) 1 == labelInfo[f].visible && (r = labelInfo[f].d);
  var p = "",
    g = 0,
    l = [],
    k = 0;
  for (f in infoTypes)
    if (document.getElementById(infoTypes[f].type + "-All-On"))
      0 == g
        ? ((p = infoTypes[f].type + "-All"), (g = 1))
        : (p = "" + p + "," + infoTypes[f].type + "-All");
    else
      for (var m in placeInfo)
        if (
          placeInfo[m].type == infoTypes[f].type &&
          document.getElementById(
            infoTypes[f].type + "-" + placeInfo[m].code + "-On",
          )
        ) {
          var s = 0,
            j;
          for (j in l)
            l[j] == infoTypes[f].type + "-" + placeInfo[m].code && (s = 1);
          s ||
            (0 == g
              ? ((p =
                  "" +
                  infoTypes[f].type +
                  "-" +
                  placeInfo[m].code.replace("%", "%25")),
                (g = 1))
              : (p =
                  p +
                  "," +
                  infoTypes[f].type +
                  "-" +
                  placeInfo[m].code.replace("%", "%25")),
            (l[k] = infoTypes[f].type + "-" + placeInfo[m].code),
            k++);
        }
  0 == g && (p = "None");
  f = "";
  0 != currentPopup &&
    (f = "\x26openPin\x3d" + currentPopup.replace("%", "%25"));
  a.href =
    "print.htm?mkey\x3d" +
    mkey +
    "\x26lc\x3d" +
    leftConsoleState +
    "\x26km\x3d" +
    keyMapState +
    "\x26rc\x3d" +
    rightConsoleState +
    "\x26zoom\x3d" +
    zoom +
    "\x26X\x3d" +
    b +
    "\x26Y\x3d" +
    c +
    "\x26layers\x3d" +
    d +
    "\x26background\x3d" +
    e +
    "\x26label\x3d" +
    r +
    "\x26overlays\x3d" +
    p +
    f;
}
function ea(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  a = Q(String(targ.className), "-");
  if ("All" != a[1])
    if ("Off" == a[2]) {
      for (var b = 1; b <= maxZoom; b++)
        document.getElementById("pindiv-" + currentPopup + "-" + b) &&
          (document.getElementById(
            "pindiv-" + currentPopup + "-" + b,
          ).style.visibility = "");
      currentPopup = 0;
      Fa("bubble-1");
      var b = W(a[0] + "-" + a[1] + "-Off"),
        d;
      for (d in b)
        ((b[d].src = "/Media/Icons/Checkbox_16x16.gif"),
          (b[d].className = a[0] + "-" + a[1] + "-On"),
          b[d].setAttribute("id", a[0] + "-" + a[1] + "-On"));
      setTimeout(
        "toggleOneHighlight('" +
          a[0] +
          "', '" +
          a[1] +
          "', '" +
          targ.className +
          "','on')",
        5,
      );
      for (var c in placeInfo)
        if (placeInfo[c].type == a[0]) {
          var e = Q(String(placeInfo[c].code), ":");
          if (e[1])
            for (var f in e)
              if (e[f] == a[1])
                for (d in ((b = W(
                  placeInfo[c].type + "-" + placeInfo[c].code + "-Off",
                )),
                b))
                  ((b[d].src = "/Media/Icons/Checkbox_16x16.gif"),
                    (b[d].className =
                      placeInfo[c].type + "-" + placeInfo[c].code + "-On"),
                    b[d].setAttribute(
                      "id",
                      placeInfo[c].type + "-" + placeInfo[c].code + "-On",
                    ),
                    setTimeout(
                      "toggleOneHighlight('" +
                        placeInfo[c].type +
                        "', '" +
                        placeInfo[c].code +
                        "', '" +
                        b[d] +
                        "','on')",
                      5,
                    ));
        }
    } else {
      Fa("bubble-1");
      b = W(a[0] + "-" + a[1] + "-On");
      for (d in b)
        ((b[d].src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
          (b[d].className = a[0] + "-" + a[1] + "-Off"),
          b[d].setAttribute("id", a[0] + "-" + a[1] + "-Off"));
      setTimeout(
        "toggleOneHighlight('" +
          a[0] +
          "', '" +
          a[1] +
          "', '" +
          targ.className +
          "','off')",
        5,
      );
    }
  else if ("Off" == a[2])
    ((targ.className = a[0] + "-All-On"),
      targ.setAttribute("id", a[0] + "-All-On"),
      (targ.src = "/Media/Icons/Checkbox_16x16.gif"),
      setTimeout(
        "toggleAllHighlights('" + a[0] + "', '" + targ.className + "','on')",
        5,
      ));
  else {
    b = W(a[0] + "-All-On");
    for (d in b)
      ((b[d].src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
        (b[d].className = a[0] + "-All-Off"),
        b[d].setAttribute("id", a[0] + "-All-Off"));
    setTimeout(
      "toggleAllHighlights('" + a[0] + "', '" + targ.className + "','off')",
      5,
    );
  }
}
function fa(a, b, d) {
  if ("on" == d)
    for (var c in placeInfo) {
      if (
        ("Parking" == a
          ? "ParkingRegion" == placeInfo[c].type &&
            document.getElementById(
              "ParkingRegion-" + placeInfo[c].code + "-Off",
            ) &&
            ((document.getElementById(
              "ParkingRegion-" + placeInfo[c].code + "-Off",
            ).src = "/Media/Icons/Checkbox_16x16.gif"),
            (document.getElementById(
              "ParkingRegion-" + placeInfo[c].code + "-Off",
            ).className = "ParkingRegion-" + placeInfo[c].code + "-On"),
            document
              .getElementById("ParkingRegion-" + placeInfo[c].code + "-Off")
              .setAttribute("id", "ParkingRegion-" + placeInfo[c].code + "-On"))
          : "FutureBuilding" == a
            ? "FutureBuildingRegion" == placeInfo[c].type &&
              document.getElementById(
                "FutureBuildingRegion-" + placeInfo[c].code + "-Off",
              ) &&
              ((document.getElementById(
                "FutureBuildingRegion-" + placeInfo[c].code + "-Off",
              ).src = "/Media/Icons/Checkbox_16x16.gif"),
              (document.getElementById(
                "FutureBuildingRegion-" + placeInfo[c].code + "-Off",
              ).className =
                "FutureBuildingRegion-" + placeInfo[c].code + "-On"),
              document
                .getElementById(
                  "FutureBuildingRegion-" + placeInfo[c].code + "-Off",
                )
                .setAttribute(
                  "id",
                  "FutureBuildingRegion-" + placeInfo[c].code + "-On",
                ))
            : "AffiliateBuilding" == a &&
              "AffiliateBuildingRegion" == placeInfo[c].type &&
              document.getElementById(
                "AffiliateBuildingRegion-" + placeInfo[c].code + "-Off",
              ) &&
              ((document.getElementById(
                "AffiliateBuildingRegion-" + placeInfo[c].code + "-Off",
              ).src = "/Media/Icons/Checkbox_16x16.gif"),
              (document.getElementById(
                "AffiliateBuildingRegion-" + placeInfo[c].code + "-Off",
              ).className =
                "AffiliateBuildingRegion-" + placeInfo[c].code + "-On"),
              document
                .getElementById(
                  "AffiliateBuildingRegion-" + placeInfo[c].code + "-Off",
                )
                .setAttribute(
                  "id",
                  "AffiliateBuildingRegion-" + placeInfo[c].code + "-On",
                )),
        placeInfo[c].type == a)
      ) {
        d = Q(String(placeInfo[c].a), "%");
        b = "";
        b =
          "2" == d[1]
            ? "Parking"
            : "3" == d[1]
              ? "FutureBuilding"
              : "4" == d[1]
                ? "AffiliateBuilding"
                : "Bldg";
        d = W(b + "-" + placeInfo[c].a + "-Off");
        for (var e in d)
          ((d[e].src = "/Media/Icons/Checkbox_16x16.gif"),
            (d[e].className = b + "-" + placeInfo[c].code + "-On"),
            d[e].setAttribute("id", b + "-" + placeInfo[c].code + "-On"));
        Ga(
          placeInfo[c].a,
          parseInt(X(placeInfo[c].color).substring(0, 2), 16),
          parseInt(X(placeInfo[c].color).substring(2, 4), 16),
          parseInt(X(placeInfo[c].color).substring(4, 6), 16),
          "both",
          placeInfo[c].k,
        );
      }
    }
  else
    for (c in placeInfo)
      if (
        ("Parking" == a
          ? "ParkingRegion" == placeInfo[c].type &&
            (document.getElementById(
              "ParkingRegion-" + placeInfo[c].code + "-On",
            ) &&
              ((document.getElementById(
                "ParkingRegion-" + placeInfo[c].code + "-On",
              ).src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
              (document.getElementById(
                "ParkingRegion-" + placeInfo[c].code + "-On",
              ).className = "ParkingRegion-" + placeInfo[c].code + "-Off"),
              document
                .getElementById("ParkingRegion-" + placeInfo[c].code + "-On")
                .setAttribute(
                  "id",
                  "ParkingRegion-" + placeInfo[c].code + "-Off",
                )),
            Y(placeInfo[c].a))
          : "FutureBuilding" == a
            ? "FutureBuildingRegion" == placeInfo[c].type &&
              (document.getElementById(
                "FutureBuildingRegion-" + placeInfo[c].code + "-On",
              ) &&
                ((document.getElementById(
                  "FutureBuildingRegion-" + placeInfo[c].code + "-On",
                ).src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
                (document.getElementById(
                  "FutureBuildingRegion-" + placeInfo[c].code + "-On",
                ).className =
                  "FutureBuildingRegion-" + placeInfo[c].code + "-Off"),
                document
                  .getElementById(
                    "FutureBuildingRegion-" + placeInfo[c].code + "-On",
                  )
                  .setAttribute(
                    "id",
                    "FutureBuildingRegion-" + placeInfo[c].code + "-Off",
                  )),
              Y(placeInfo[c].a))
            : "AffiliateBuilding" == a &&
              "AffiliateBuildingRegion" == placeInfo[c].type &&
              (document.getElementById(
                "AffiliateBuildingRegion-" + placeInfo[c].code + "-On",
              ) &&
                ((document.getElementById(
                  "AffiliateBuildingRegion-" + placeInfo[c].code + "-On",
                ).src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
                (document.getElementById(
                  "AffiliateBuildingRegion-" + placeInfo[c].code + "-On",
                ).className =
                  "AffiliateBuildingRegion-" + placeInfo[c].code + "-Off"),
                document
                  .getElementById(
                    "AffiliateBuildingRegion-" + placeInfo[c].code + "-On",
                  )
                  .setAttribute(
                    "id",
                    "AffiliateBuildingRegion-" + placeInfo[c].code + "-Off",
                  )),
              Y(placeInfo[c].a)),
        placeInfo[c].type == a)
      ) {
        d = Q(String(placeInfo[c].a), "%");
        b =
          "2" == d[1]
            ? "Parking"
            : "3" == d[1]
              ? "FutureBuilding"
              : "4" == d[1]
                ? "AffiliateBuilding"
                : "Bldg";
        d = W(b + "-" + placeInfo[c].code + "-On");
        for (e in d)
          ((d[e].src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
            (d[e].className = b + "-" + placeInfo[c].code + "-Off"),
            d[e].setAttribute("id", b + "-" + placeInfo[c].code + "-Off"));
        Y(placeInfo[c].a);
      }
  0 != currentPopup &&
    document.getElementById("pindiv-" + currentPopup + "-" + zoom) &&
    (Ha(), (currentPopup = 0));
  U();
}
function ga(a, b, d, c) {
  d = "";
  if ("on" == c) {
    d = "both";
    var e = (c = 0),
      f = 0,
      r = 0,
      p = 0,
      g = 0,
      l = 0,
      k = 0,
      m = 0,
      s = 0,
      j = 0,
      E = 0,
      q;
    for (q in placeInfo)
      if (placeInfo[q].code == b && placeInfo[q].type == a) {
        var n = Q(String(placeInfo[q].a), "%"),
          x = "",
          x =
            "2" == n[1]
              ? "Parking"
              : "3" == n[1]
                ? "FutureBuilding"
                : "4" == n[1]
                  ? "AffiliateBuilding"
                  : "Bldg",
          n = W(x + "-" + placeInfo[q].a + "-Off"),
          K;
        for (K in n)
          ((n[K].src = "/Media/Icons/Checkbox_16x16.gif"),
            (n[K].className = x + "-" + placeInfo[q].a + "-On"),
            n[K].setAttribute("id", x + "-" + placeInfo[q].a + "-On"));
        Ga(
          placeInfo[q].a,
          parseInt(X(placeInfo[q].color).substring(0, 2), 16),
          parseInt(X(placeInfo[q].color).substring(2, 4), 16),
          parseInt(X(placeInfo[q].color).substring(4, 6), 16),
          d,
          placeInfo[q].k,
        );
        if ("Bldg" == a || "Parking" == a || "Place" == a)
          if (shapes["key-" + placeInfo[q].a] || "pin" == d)
            ((polyX =
              centerInfo[placeInfo[q].a].f * zoomInfo[zoom + "-Base"].width),
              (polyY =
                centerInfo[placeInfo[q].a].g * zoomInfo[zoom + "-Base"].height),
              (n = document.getElementById("viewerWindow")),
              (x = n.clientHeight / 2),
              (n = n.clientWidth / 2),
              (x -= polyY),
              (n -= polyX),
              T(document.getElementById("drawingWindow-" + zoom), n, x),
              document.getElementById("keyLite") && Z(),
              V());
        "Region" == a &&
          ((c += centerInfo[placeInfo[q].a].f),
          (e += centerInfo[placeInfo[q].a].g),
          (f += 1));
        "RegionsRegions" == a &&
          ((c += centerInfo[placeInfo[q].a].f),
          (e += centerInfo[placeInfo[q].a].g),
          (f += 1));
        "ParkingRegion" == a &&
          ((r += centerInfo[placeInfo[q].a].f),
          (p += centerInfo[placeInfo[q].a].g),
          g++);
        "FutureBuildingRegion" == a &&
          ((l += centerInfo[placeInfo[q].a].f),
          (k += centerInfo[placeInfo[q].a].g),
          m++);
        "AffiliateBuildingRegion" == a &&
          ((s += centerInfo[placeInfo[q].a].f),
          (j += centerInfo[placeInfo[q].a].g),
          E++);
        "CleryMap" == a &&
          ((s += centerInfo[placeInfo[q].a].f),
          (j += centerInfo[placeInfo[q].a].g),
          E++);
      }
    "Region" == a &&
      ((c = (c / f) * zoomInfo[zoom + "-Base"].width),
      (e = (e / f) * zoomInfo[zoom + "-Base"].height),
      (n = document.getElementById("viewerWindow")),
      (x = n.clientHeight / 2),
      (n = n.clientWidth / 2),
      T(document.getElementById("drawingWindow-" + zoom), n - c, x - e),
      document.getElementById("keyLite") && Z(),
      V());
    "RegionsRegions" == a &&
      ((c = (c / f) * zoomInfo[zoom + "-Base"].width),
      (e = (e / f) * zoomInfo[zoom + "-Base"].height),
      (n = document.getElementById("viewerWindow")),
      (x = n.clientHeight / 2),
      (n = n.clientWidth / 2),
      T(document.getElementById("drawingWindow-" + zoom), n - c, x - e),
      document.getElementById("keyLite") && Z(),
      V());
    "ParkingRegion" == a &&
      ((r = (r / g) * zoomInfo[zoom + "-Base"].width),
      (p = (p / g) * zoomInfo[zoom + "-Base"].height),
      (n = document.getElementById("viewerWindow")),
      (x = n.clientHeight / 2),
      (n = n.clientWidth / 2),
      T(document.getElementById("drawingWindow-" + zoom), n - r, x - p),
      document.getElementById("keyLite") && Z(),
      V());
    "FutureBuildingRegion" == a &&
      ((l = (l / m) * zoomInfo[zoom + "-Base"].width),
      (k = (k / m) * zoomInfo[zoom + "-Base"].height),
      (n = document.getElementById("viewerWindow")),
      (x = n.clientHeight / 2),
      (n = n.clientWidth / 2),
      T(document.getElementById("drawingWindow-" + zoom), n - l, x - k),
      document.getElementById("keyLite") && Z(),
      V());
    "AffiliateBuildingRegion" == a &&
      ((s = (s / E) * zoomInfo[zoom + "-Base"].width),
      (j = (j / E) * zoomInfo[zoom + "-Base"].height),
      (n = document.getElementById("viewerWindow")),
      (x = n.clientHeight / 2),
      (n = n.clientWidth / 2),
      T(document.getElementById("drawingWindow-" + zoom), n - s, x - j),
      document.getElementById("keyLite") && Z(),
      V());
    "CleryMap" == a &&
      ((s = (s / E) * zoomInfo[zoom + "-Base"].width),
      (j = (j / E) * zoomInfo[zoom + "-Base"].height),
      (n = document.getElementById("viewerWindow")),
      (x = n.clientHeight / 2),
      (n = n.clientWidth / 2),
      T(document.getElementById("drawingWindow-" + zoom), n - s, x - j),
      document.getElementById("keyLite") && Z(),
      V());
  } else
    for (q in placeInfo)
      if (placeInfo[q].code == b && placeInfo[q].type == a) {
        n = Q(String(placeInfo[q].a), "%");
        x =
          "2" == n[1]
            ? "Parking"
            : "3" == n[1]
              ? "FutureBuilding"
              : "4" == n[1]
                ? "AffiliateBuilding"
                : "Bldg";
        n = W(x + "-" + placeInfo[q].a + "-On");
        for (K in n)
          ((n[K].src = "/Media/Icons/CheckboxEmpty_16x16.gif"),
            (n[K].className = x + "-" + placeInfo[q].a + "-Off"),
            n[K].setAttribute("id", x + "-" + placeInfo[q].a + "-Off"));
        Y(placeInfo[q].a);
      }
  0 != currentPopup &&
    document.getElementById("pindiv-" + currentPopup + "-" + zoom) &&
    (Ha(), (currentPopup = 0));
  U();
}
function la(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  a = Q(String(targ.id), ":");
  "Off" == a[1] &&
    ((document.getElementById(a[0] + "InnerDiv").style.display = "block"),
    targ.setAttribute("id", a[0] + ":On"),
    (targ.src = "/Media/Trees/Collapse_16x16.gif"));
  "On" == a[1] &&
    ((document.getElementById(a[0] + "InnerDiv").style.display = "none"),
    targ.setAttribute("id", a[0] + ":Off"),
    (targ.src = "/Media/Trees/Expand_16x16.gif"));
  R();
}
function Ia(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  var b = Q(String(targ.id), "-");
  if (
    "polyline" != String(targ.nodeName) &&
    "shape" != String(targ.nodeName) &&
    "pin" != String(targ.id.substr(0, 3))
  ) {
    var b = Q(String(clickPoly.id), "-"),
      d = document.getElementById("shapeWindow");
    d.style.zIndex = 1e4;
    targ = document.elementFromPoint(a.pageX, a.pageY);
    d.style.zIndex = -1;
  }
  if ("Image" != targ.id.substr(0, 5)) {
    for (d = 1; d <= maxZoom; d++)
      document.getElementById("pindiv-" + b[1] + "-" + d) &&
        (document.getElementById("pindiv-" + b[1] + "-" + d).style.visibility =
          "hidden");
    for (var c in placeInfo)
      placeInfo[c].a == b[1] &&
        ("Bldg" == placeInfo[c].type ||
          "Parking" == placeInfo[c].type ||
          "FutureBuilding" == placeInfo[c].type ||
          "AffiliateBuilding" == placeInfo[c].type) &&
        Ga(
          placeInfo[c].a,
          parseInt(X(placeInfo[c].color).substring(0, 2), 16),
          parseInt(X(placeInfo[c].color).substring(2, 4), 16),
          parseInt(X(placeInfo[c].color).substring(4, 6), 16),
          "poly",
          placeInfo[c].k,
        );
    if (0 != currentPopup && currentPopup != b[1])
      for (d = 1; d <= maxZoom; d++)
        document.getElementById("pindiv-" + b[1] + "-" + d) &&
          (document.getElementById(
            "pindiv-" + currentPopup + "-" + d,
          ).style.visibility = "");
    currentPopup = b[1];
    U();
    c = Q(String(b[1]), "%");
    c = "polyData" + c[1] + ".htm?bkey\x3d" + c[0];
    var e = Ba();
    e.open("GET", c, J);
    e.onreadystatechange = function (d, c) {
      if (4 == e.readyState)
        if (200 == e.status) {
          var p = e.responseText;
          if (p != L) {
            var g = document.getElementById("bubble-1");
            g.innerHTML = p;
            c = d = 0;
            var p = document.getElementById("upperLeft-1"),
              l = document.getElementById("upperRight-1"),
              k = document.getElementById("lowerRight-1"),
              m = document.getElementById("lowerLeft-1"),
              s = document.getElementById("topBorder-1"),
              j = document.getElementById("leftBorder-1"),
              E = document.getElementById("rightBorder-1"),
              q = document.getElementById("bottomBorder-1"),
              n = document.getElementById("arrow-1"),
              x = document.getElementById("bubbleContent-1");
            x.style.height = "0px";
            x.style.width = "1000px";
            var K = document.getElementById("bubbleContentTable");
            g.style.height =
              "" + (1 * K.clientHeight + 2 * p.clientHeight) + "px";
            g.style.width = "" + (1 * K.clientWidth + 2 * p.clientWidth) + "px";
            var K = g.clientHeight,
              S = Math.max(g.clientWidth, 200);
            p.style.left = "0px";
            p.style.top = "0px";
            l.style.left = "" + (1 * S - 1 * p.clientWidth) + "px";
            l.style.top = "0px";
            m.style.left = "0px";
            m.style.top = "" + (1 * K - 1 * m.clientHeight) + "px";
            k.style.left = "" + (1 * S - 1 * k.clientWidth) + "px";
            k.style.top = "" + (1 * K - k.clientHeight) + "px";
            s.style.height = "" + p.clientHeight + "px";
            s.style.width =
              "" + (1 * S - 1 * p.clientWidth - 1 * l.clientWidth) + "px";
            s.style.left = "" + p.clientWidth + "px";
            s.style.top = "0px";
            j.style.height =
              "" + (1 * K - 1 * p.clientHeight - 1 * m.clientHeight) + "px";
            j.style.width = "" + p.clientWidth + "px";
            j.style.left = "0px";
            j.style.top = "" + p.clientHeight + "px";
            E.style.height =
              "" + (1 * K - 1 * l.clientHeight - 1 * k.clientHeight) + "px";
            E.style.width = "" + l.clientWidth + "px";
            E.style.left = window.addEventListener
              ? "" + (1 * S - 1 * l.clientWidth - 1) + "px"
              : "" + (1 * S - 1 * l.clientWidth) + "px";
            E.style.top = "" + l.clientHeight + "px";
            q.style.height = "" + m.clientHeight + "px";
            q.style.width =
              "" + (1 * S - 1 * m.clientWidth - 1 * k.clientWidth) + "px";
            q.style.left = "" + m.clientWidth + "px";
            q.style.top = window.addEventListener
              ? "" + (1 * K - 1 * m.clientHeight - 1) + "px"
              : "" + (1 * K - 1 * m.clientHeight) + "px";
            x.style.left = "" + p.clientWidth + "px";
            x.style.top = "" + p.clientHeight + "px";
            x.style.width =
              "" + (1 * S - 1 * p.clientWidth - 1 * l.clientWidth) + "px";
            x.style.height =
              "" + (1 * K - 1 * p.clientHeight - 1 * m.clientHeight) + "px";
            n.style.left = "60px";
            n.style.top = "" + (1 * K - m.clientHeight) + "px";
            p = g.clientHeight;
            l = document.getElementById("drawingWindow-" + zoom);
            k = document.getElementById("viewerWindow");
            l.appendChild(g);
            if (a.pageX || a.pageY) ((d = a.pageX), (c = a.pageY));
            else if (a.clientX || a.clientY)
              ((d =
                a.clientX +
                document.body.scrollLeft +
                document.documentElement.scrollLeft),
                (c =
                  a.clientY +
                  document.body.scrollTop +
                  document.documentElement.scrollTop));
            m = c - k.offsetTop;
            d = d - k.offsetLeft - l.offsetLeft;
            c = m - l.offsetTop;
            "poly" != b[0] &&
              ((d = centerInfo[b[1]].f * zoomInfo[zoom + "-Base"].width),
              (c = centerInfo[b[1]].g * zoomInfo[zoom + "-Base"].height));
            g.style.left = "" + (d - 70) + "px";
            g.style.top = "" + (c - p - 74) + "px";
            g.style.visibility = "visible";
            setTimeout("checkPinOverlap('" + g.id + "', '" + l.id + "')", 200);
          }
        } else
          404 == e.status
            ? alert("Request URL does not exist")
            : alert("Error: status code is " + e.status);
    };
    e.send(L);
  }
}
function ia(a, b) {
  a = document.getElementById(a);
  b = document.getElementById(b);
  var d = document.getElementById("viewerWindow");
  0 > a.offsetTop + b.offsetTop && T(b, b.offsetLeft, -a.offsetTop + 10);
  0 > a.offsetLeft + b.offsetLeft && T(b, -a.offsetLeft + 10, b.offsetTop);
  b.offsetLeft + a.offsetLeft + a.clientWidth > d.clientWidth &&
    T(b, d.clientWidth - a.offsetLeft - a.clientWidth - 10, b.offsetTop);
  V();
}
function qa(a) {
  for (var b = 1; b <= maxZoom; b++)
    document.getElementById("pindiv-" + a + "-" + b) &&
      (document.getElementById("pindiv-" + a + "-" + b).style.visibility = "");
  currentPopup = 0;
  U();
  Fa("bubble-1");
}
function pa(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  a = "search.htm?mkey\x3d" + mkey + "\x26Keywords\x3d" + targ.value;
  var b = Ba();
  b.open("GET", a, J);
  b.onreadystatechange = function () {
    if (4 == b.readyState)
      if (200 == b.status) {
        var a = b.responseText,
          a = Q(String(a), ":");
        if (
          a[1] != L &&
          a[0] == document.getElementById("Keywords").value &&
          document.getElementById("bldgSearch")
        ) {
          searchTable = document.getElementById("bldgSearch");
          var c = "",
            e;
          for (e in a) 0 != e && (c += a[e]);
          searchTable.innerHTML = c;
          R();
        }
      } else
        404 == b.status
          ? alert("Request URL does not exist")
          : alert("Error: status code is " + b.status);
  };
  b.send(L);
}
function da(a, b) {
  document.getElementById(a + "-" + b + "-Off")
    ? (N(a + "-" + b + "-Off"),
      document.getElementById(a + ":Off") && N(a + ":Off"),
      "ParkingRegion" == a
        ? document.getElementById("Parking" + b + ":Off") &&
          N("Parking" + b + ":Off")
        : "FutureBuildingRegion" == a
          ? document.getElementById("Parking" + b + ":Off") &&
            N("Parking" + b + ":Off")
          : "AffiliateBuildingRegion" == a
            ? document.getElementById("Parking" + b + ":Off") &&
              N("Parking" + b + ":Off")
            : document.getElementById(b + ":Off") && N(b + ":Off"))
    : N(a + "-" + b + "-On");
}
window.v = M;
window.u = M;
window.w = M;
window.z = M;
window.divStretch = M;
window.divStretchTarget = "";
window.A = 0;
window.B = 0;
window.startPinch = 0;
window.C = 0;
window.t = 0;
window.thumbOffsetY = 0;
window.thumbOffsetX = 0;
function ta(a) {
  a = a || window.event;
  a.preventDefault && a.preventDefault();
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  clickposx = a.screenX;
  clickposy = a.screenY;
  if (a.touches) {
    clickposx = a.targetTouches[0].pageX;
    clickposy = a.targetTouches[0].pageY;
    var b = a.targetTouches[1] != L ? a.targetTouches[1].pageY : 0;
    mousePosX =
      (a.targetTouches[0].pageX +
        (a.targetTouches[1] != L ? a.targetTouches[1].pageX : 0)) /
      2;
    mousePosY = (a.targetTouches[0].pageY + b) / 2;
  }
  if ("Measure" == pointerMode) {
    pointPosX =
      a.pageX -
      document.getElementById("drawingWindow-" + zoom).offsetLeft -
      document.getElementById("viewerWindow").offsetLeft;
    pointPosY =
      a.pageY -
      document.getElementById("drawingWindow-" + zoom).offsetTop -
      document.getElementById("viewerWindow").offsetTop;
    a = pointPosX;
    var b = pointPosY,
      d = zoom;
    if (document.getElementById("measurePoly")) measureSegments += 1;
    else {
      var c = measureCanvases[d - 1].createPolyline([a, b]),
        e = c.getNode();
      measurePoly = c;
      measureSegments = 1;
      e.setAttribute("id", "measurePoly");
      e.style.visibility = "";
      c.setStroke({ width: 3, color: [0, 0, 0, 0.6] });
      "Poly" == pointerSubMode && c.setFill([0, 0, 0, 0.3]);
      c = document.getElementById("measure-" + pointerSubMode);
      e = document.getElementById("measure-" + pointerSubMode + "-2");
      "Line" == pointerSubMode
        ? ((c.innerHTML = "0 ft"), (e.innerHTML = "0 ft"))
        : ((c.innerHTML = ""), (e.innerHTML = ""));
      document.getElementById("measureWindow-" + d).appendChild(c);
      c.style.visibility = "";
      c.style.left = a + "px";
      c.style.top = b - 20 + "px";
    }
  } else {
    b = 0;
    if ((b = "A" == String(targ.nodeName)))
      ((b = a || window.event),
        (d = "LEFT"),
        b.which
          ? (3 == b.which && (d = "RIGHT"), 2 == b.which && (d = "MIDDLE"))
          : b.button &&
            (2 == b.button && (d = "RIGHT"), 4 == b.button && (d = "MIDDLE")),
        (b = "LEFT" == d));
    b && (location.href = targ.href);
    b = "DIV" != String(targ.nodeName) ? targ.parentNode : targ;
    String(b.parentNode.id) == "drawingWindow-" + zoom && (b = b.parentNode);
    if (
      "shapeWindow" == String(b.parentNode.id) ||
      "shapeWindow" == String(b.parentNode.parentNode.id)
    )
      b = document.getElementById("drawingWindow-" + zoom);
    "bubble-1" == String(b.parentNode.id) &&
      (b = document.getElementById("drawingWindow-" + zoom));
    "keyLiteShade" == String(targ.id) && (b = targ.parentNode);
    scrollstartleft = parseInt(b.style.left, 10);
    scrollstarttop = parseInt(b.style.top, 10);
    if ("viewerWindow" == b.id || b.id == "drawingWindow-" + zoom)
      ((ismousedown = J),
        (document.onselectstart = Ja),
        a.touches ||
          (document.getElementById("drawingWindow-" + zoom).style.cursor =
            "url('/Media/Cursors/closedhand_8_8.cur'), default"));
    else if ("keyLite" == b.id || "keyLiteShade" == b.id)
      (a.touches ||
        (document.getElementById("keyLiteShade").style.cursor =
          "url('/Media/Cursors/closedhand_8_8.cur'), default"),
        (keyliteclickoff = ismousedownkey = J),
        (document.onselectstart = Ja));
    if (
      document.getElementById("shapeWindow") &&
      ("IMG" == String(targ.nodeName) || "svg" == String(targ.nodeName))
    )
      ((shapeWindow.style.zIndex = 1e4),
        (clickPoly = document.elementFromPoint(a.clientX, a.clientY)),
        (shapeWindow.style.zIndex = -1));
  }
}
function va(a) {
  a || (a = window.event);
  if (a) {
    var b = 0;
    a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
    a.cancelBubble = J;
    a.stopPropagation && a.stopPropagation();
    document.getElementById("drawingWindow-" + zoom).style.cursor =
      "url('/Media/Cursors/openhand_8_8.cur'), default";
    document.getElementById("keyLiteShade") &&
      (document.getElementById("keyLiteShade").style.cursor =
        "url('/Media/Cursors/openhand_8_8.cur'), default");
    ismousedownkey = ismousedownscroll = ismousedown = M;
    document.onselectstart = L;
    if (document.getElementById("shapeWindow")) {
      shapeWindow.style.zIndex = 1e4;
      var d = 0;
      if (
        (d = a.touches
          ? document.elementFromPoint(clickposx, clickposy)
          : document.elementFromPoint(a.clientX, a.clientY)) &&
        ("polyline" == String(d.nodeName) || "shape" == String(d.nodeName)) &&
        "pointObject" != b.className
      )
        a.touches
          ? Ka(d.id, clickposx, clickposy)
          : Ka(d.id, a.clientX, a.clientY);
      shapeWindow.style.zIndex = -1;
    }
  }
}
function La(a, b) {
  if (ismousedown == J) {
    var d = a.screenX,
      c = a.screenY;
    a.touches &&
      ((d = a.targetTouches[0].pageX), (c = a.targetTouches[0].pageY));
    0 == d && 0 == c && ((d = clickposx), (c = clickposy));
    d -= clickposx;
    c -= clickposy;
    d = scrollstartleft + d;
    c = scrollstarttop + c;
    T(b, d, c);
    document.getElementById("keyLite") && Ea();
    V();
  } else if (ismousedownkey == J) {
    d = a.screenX;
    c = a.screenY;
    a.touches &&
      ((d = a.targetTouches[0].pageX), (c = a.targetTouches[0].pageY));
    0 == d && 0 == c && ((d = clickposx), (c = clickposy));
    var d = d - clickposx,
      c = c - clickposy,
      e =
        document.getElementById("viewerWindow").clientHeight /
        document.getElementById("keyLite").clientHeight,
      d =
        -(scrollstartleft + d) *
        (document.getElementById("viewerWindow").clientWidth /
          document.getElementById("keyLite").clientWidth),
      c = -(scrollstarttop + c) * e;
    T(document.getElementById("drawingWindow-" + zoom), d, c);
    Z();
    V();
  }
}
function T(a, b, d) {
  a.style.left = "" + b + "px";
  a.style.top = "" + d + "px";
}
function V() {
  var a = document.getElementById("viewerWindow"),
    b = document.getElementById("drawingWindow-" + zoom),
    d,
    c,
    e,
    f = Math.floor(Math.max(-b.offsetLeft / tile, 0)),
    r = Math.floor(
      Math.min((a.clientWidth - b.offsetLeft) / tile, countX[zoom] - 1),
    ),
    p = Math.floor(Math.max(-b.offsetTop / tile, 0)),
    a = Math.floor(
      Math.min((a.clientHeight - b.offsetTop) / tile, countY[zoom] - 1),
    ),
    b = zoom - 1;
  if ("Maps" == module || "pubMaps" == module) {
    c = zoom;
    e = document.getElementById("viewerWindow");
    var g = document.getElementById("drawingWindow-" + c),
      l = c - 1;
    for (d in backgroundInfo)
      if (1 == backgroundInfo[d].visible) {
        backgroundTop =
          backgroundZoom[backgroundInfo[d].c + "-" + c].height *
          backgroundInfo[d].offsetY;
        backgroundLeft =
          backgroundZoom[backgroundInfo[d].c + "-" + c].width *
          backgroundInfo[d].offsetX;
        backgroundCountX = Math.ceil(
          backgroundZoom[backgroundInfo[d].c + "-" + c].width / tile,
        );
        backgroundCountY = Math.ceil(
          backgroundZoom[backgroundInfo[d].c + "-" + c].height / tile,
        );
        for (
          var k = Math.floor(
              Math.max((-g.offsetLeft - backgroundLeft) / tile, 0),
            ),
            m = Math.floor(
              Math.min(
                (e.clientWidth - g.offsetLeft - backgroundLeft) / tile,
                backgroundCountX - 1,
              ),
            ),
            s = Math.floor(Math.max((-g.offsetTop - backgroundTop) / tile, 0)),
            j = Math.floor(
              Math.min(
                (e.clientHeight - g.offsetTop - backgroundTop) / tile,
                backgroundCountY - 1,
              ),
            );
          k <= m;
          k += 1
        )
          for (var E = s; E <= j; E += 1) {
            var q =
              "Image-" + backgroundInfo[d].name + "-" + k + "x" + E + "-" + c;
            w = Math.min(
              tile,
              backgroundZoom[backgroundInfo[d].c + "-" + c].width - k * tile,
            );
            h = Math.min(
              tile,
              backgroundZoom[backgroundInfo[d].c + "-" + c].height - E * tile,
            );
            source =
              path +
              backgroundInfo[d].name +
              "/~" +
              backgroundInfo[d].h +
              "/" +
              l +
              "/" +
              E +
              "/" +
              k +
              ext;
            if (document.getElementById(q))
              document.getElementById(q).src = source;
            else {
              var n = document.createElement("img");
              n.setAttribute("id", q);
              n.setAttribute("name", q);
              9 != document.documentMode &&
                (window.addEventListener
                  ? ((n.style.visibility = "hidden"),
                    n.addEventListener("load", $, M))
                  : ((n.style.visibility = "hidden"), (n.onload = $)));
              n.style.border = "0px none";
              n.style.margin = "0px";
              n.style.padding = "0px";
              n.style.left = k * tile + "px";
              n.style.top = E * tile + "px";
              n.style.width = w + "px";
              n.style.height = h + "px";
              n.style.position = "absolute";
              n.style.zIndex = 0;
              n.src = source;
              document
                .getElementById(
                  "drawingWindow-" + backgroundInfo[d].name + "-" + c,
                )
                .appendChild(n);
            }
          }
      }
  }
  if ("Maps" == module || "pubMaps" == module) {
    d = zoom;
    c = document.getElementById("viewerWindow");
    e = document.getElementById("drawingWindow-" + d);
    var g = d - 1,
      x;
    for (x in labelInfo)
      if (1 == labelInfo[x].visible) {
        labelTop =
          labelZoom[labelInfo[x].d + "-" + d].height * labelInfo[x].offsetY;
        labelLeft =
          labelZoom[labelInfo[x].d + "-" + d].width * labelInfo[x].offsetX;
        labelCountX = Math.ceil(
          labelZoom[labelInfo[x].d + "-" + d].width / tile,
        );
        labelCountY = Math.ceil(
          labelZoom[labelInfo[x].d + "-" + d].height / tile,
        );
        j = Math.floor(
          Math.max(
            (-e.offsetLeft - labelLeft) / tile - 1,
            (0 - labelLeft) / tile,
          ),
        );
        l = Math.floor(
          Math.min(
            (c.clientWidth - e.offsetLeft - labelLeft) / tile + 1,
            labelCountX - 1,
          ),
        );
        m = Math.floor(
          Math.max((-e.offsetTop - labelTop) / tile - 1, (0 - labelTop) / tile),
        );
        for (
          s = Math.floor(
            Math.min(
              (c.clientHeight - e.offsetTop - labelTop) / tile + 1,
              labelCountY - 1,
            ),
          );
          j <= l;
          j += 1
        )
          for (k = m; k <= s; k += 1)
            ((E = "Image-" + labelInfo[x].name + "-" + j + "x" + k + "-" + d),
              (w = Math.min(
                tile,
                labelZoom[labelInfo[x].d + "-" + d].width - j * tile,
              )),
              (h = Math.min(
                tile,
                labelZoom[labelInfo[x].d + "-" + d].height - k * tile,
              )),
              (source =
                path +
                labelInfo[x].name +
                "/~" +
                labelInfo[x].h +
                "/" +
                g +
                "/" +
                k +
                "/" +
                j +
                ext),
              document.getElementById(E)
                ? (document.getElementById(E).src = source)
                : ((q = document.createElement("img")),
                  q.setAttribute("id", E),
                  q.setAttribute("name", E),
                  (q.style.visibility = "hidden"),
                  9 != document.documentMode &&
                    (window.addEventListener
                      ? ((q.style.visibility = "hidden"),
                        q.addEventListener("load", $, M))
                      : ((q.style.visibility = "hidden"), (q.onload = $))),
                  (q.style.border = "0px none"),
                  (q.style.margin = "0px"),
                  (q.style.padding = "0px"),
                  (q.style.left = j * tile + "px"),
                  (q.style.top = k * tile + "px"),
                  (q.style.width = w + "px"),
                  (q.style.height = h + "px"),
                  (q.style.position = "absolute"),
                  (q.style.zIndex = 0),
                  (q.src = source),
                  document
                    .getElementById(
                      "drawingWindow-" + labelInfo[x].name + "-" + d,
                    )
                    .appendChild(q)));
      }
  }
  for (; f <= r; f += 1)
    for (x = p; x <= a; x += 1)
      if (
        ("Maps" != module &&
          "Floorplans" != module &&
          "pubMaps" != module &&
          ((g = "Image-" + f + "x" + x + "-" + zoom),
          (c = Math.min(tile, zoomInfo[zoom].width - f * tile)),
          (d = Math.min(tile, zoomInfo[zoom].height - x * tile)),
          (e = dig + "/" + b + "/" + x + "/" + f + ext),
          document.getElementById(g)
            ? (document.getElementById(g).src = e)
            : ((l = document.createElement("img")),
              l.setAttribute("id", g),
              l.setAttribute("name", g),
              9 != document.documentMode &&
                (window.addEventListener
                  ? ((l.style.visibility = "hidden"),
                    l.addEventListener("load", $, M))
                  : ((l.style.visibility = "hidden"), (l.onload = $))),
              (l.style.border = "0px none"),
              (l.style.margin = "0px"),
              (l.style.padding = "0px"),
              (l.style.left = f * tile + "px"),
              (l.style.top = x * tile + "px"),
              (l.style.width = c + "px"),
              (l.style.height = d + "px"),
              (l.style.position = "absolute"),
              (l.style.zIndex = 0),
              (l.src = e),
              document.getElementById("drawingWindow-" + zoom).appendChild(l))),
        "Maps" == module || "Floorplans" == module || "pubMaps" == module)
      )
        for (g in ((d = f), (c = x), (e = zoom), (g = void 0), layerInfo))
          if (1 == layerInfo[g].toggle && 1 == layerInfo[g].e) {
            l = "Image-" + layerInfo[g].name + "-" + d + "x" + c + "-" + e;
            k = e - 1;
            s = m = 0;
            j = "";
            if ("Maps" == module || "pubMaps" == module)
              ((m = Math.min(
                tile,
                zoomInfo[e + "-" + layerInfo[g].b].width - d * tile,
              )),
                (s = Math.min(
                  tile,
                  zoomInfo[e + "-" + layerInfo[g].b].height - c * tile,
                )),
                (j = layerInfo[g].q
                  ? path +
                    layerInfo[g].b +
                    "/~" +
                    layerInfo[g].h +
                    "/_All/" +
                    k +
                    "/" +
                    c +
                    "/" +
                    d +
                    ext
                  : path +
                    layerInfo[g].b +
                    "/~" +
                    layerInfo[g].h +
                    "/" +
                    layerInfo[g].name +
                    "/" +
                    k +
                    "/" +
                    c +
                    "/" +
                    d +
                    ext));
            "Floorplans" == module &&
              ((m = Math.min(tile, zoomInfo[e].width - d * tile)),
              (s = Math.min(tile, zoomInfo[e].height - c * tile)),
              (j =
                path + layerInfo[g].name + "/" + k + "/" + c + "/" + d + ext));
            document.getElementById(l)
              ? (document.getElementById(l).src = j)
              : ((k = document.createElement("img")),
                k.setAttribute("id", l),
                k.setAttribute("name", l),
                9 != document.documentMode &&
                  (window.addEventListener
                    ? ((k.style.visibility = "hidden"),
                      k.addEventListener("load", $, M))
                    : ((k.style.visibility = "hidden"), (k.onload = $))),
                (k.style.border = "0px none"),
                (k.style.margin = "0px"),
                (k.style.padding = "0px"),
                (k.style.left = d * tile + "px"),
                (k.style.top = c * tile + "px"),
                (k.style.width = m + "px"),
                (k.style.height = s + "px"),
                (k.style.position = "absolute"),
                (k.style.zIndex = 0),
                (k.src = j),
                document
                  .getElementById(
                    "drawingWindow-" + layerInfo[g].name + "-" + e,
                  )
                  .appendChild(k));
          }
}
function O(a, b, d) {
  var c = M;
  document.getElementById("shapeWindow") &&
    ((shapeWindow.style.visibility = "hidden"), (c = J));
  if (document.getElementById("drawingWindow-" + a))
    var e = document.getElementById("drawingWindow-" + zoom),
      f = document.getElementById("drawingWindow-" + a);
  else return M;
  var r = 0,
    p = 0;
  0 == b && 0 == d
    ? ((r = document.getElementById("viewerWindow").clientWidth / 2),
      (p = document.getElementById("viewerWindow").clientHeight / 2))
    : ((r = b - document.getElementById("viewerWindow").offsetLeft),
      (p = d - document.getElementById("viewerWindow").offsetTop));
  b = f.clientWidth / e.clientWidth;
  d = f.clientHeight / e.clientHeight;
  var g = (r - e.offsetLeft) * b,
    l = (p - e.offsetTop) * d,
    r = r - g,
    p = p - l;
  if (document.getElementById("bubble-1")) {
    var k = document.getElementById("bubble-1"),
      m = (1 * k.offsetLeft + 70) * b - 70,
      s = (1 * k.offsetTop + k.clientHeight + 71) * d - k.clientHeight - 71;
    f.appendChild(k);
    k.style.left = m + "px";
    k.style.top = s + "px";
  }
  if (c) {
    f.appendChild(shapeWindow);
    k = Math.pow(2, maxZoom - a);
    shapeWindow.style.visibility = "hidden";
    for (var j in shapes)
      if (
        ((m = Q(String(j), "-")),
        !m[2] &&
          (shapes[j].applyTransform(dojox.gfx.matrix.scale({ x: b, y: d })),
          "svg" == dojo.dojox.gfx.renderer))
      )
        for (var m = m[1], s = 0, E = J, q = ""; E == J; )
          if (
            shapes["key-" + m + "-outer-" + s] ||
            shapes["key-" + m + "-" + s]
          ) {
            shapes["key-" + m + "-outer-" + s] &&
              ((q =
                shapes["key-" + m + "-outer-" + s].strokeStyle.color.toRgb()),
              shapes["key-" + m + "-outer-" + s].setStroke({
                width: k,
                color: q,
              }));
            for (var n = 1, x = J; x == J; )
              shapes["key-" + m + "-inner-" + n + "-" + s]
                ? ((q =
                    shapes[
                      "key-" + m + "-inner-" + n + "-" + s
                    ].strokeStyle.color.toRgb()),
                  shapes["key-" + m + "-inner-" + n + "-" + s].setStroke({
                    width: k,
                    color: q,
                  }),
                  n++)
                : (x = M);
            shapes["key-" + m + "-" + s] &&
              ((q = shapes["key-" + m + "-" + s].strokeStyle.color.toRgb()),
              shapes["key-" + m + "-" + s].setStroke({ width: k, color: q }));
            s++;
          } else E = M;
    shapeWindow.style.visibility = "";
  }
  T(f, r, p);
  if (
    document.getElementById("measurePoly") &&
    document.getElementById("measurePoly")
  ) {
    r = measureCanvases[a - 1];
    p = measurePoly.getShape().points;
    j = [];
    for (k = 0; k < measureSegments; k++)
      ((j[2 * k] = p[k].x * b), (j[2 * k + 1] = p[k].y * d));
    "Nav" == lastPointerSubMode &&
      ((j[2 * measureSegments] = g), (j[2 * measureSegments + 1] = l));
    if ("Poly" == pointerSubMode || "Poly" == lastPointerSubMode)
      ((j[2 * measureSegments + 2] = j[0]),
        (j[2 * measureSegments + 3] = j[1]));
    measurePoly.removeShape();
    b = r.createPolyline(j);
    d = b.getNode();
    measurePoly = b;
    d.setAttribute("id", "measurePoly");
    d.style.visibility = "";
    b.setStroke({ width: 3, color: [0, 0, 0, 0.6] });
    ("Poly" == pointerSubMode || "Poly" == lastPointerSubMode) &&
      b.setFill([0, 0, 0, 0.3]);
    b = "";
    b = "Nav" != lastPointerSubMode ? lastPointerSubMode : pointerSubMode;
    document.getElementById("measure-" + b) &&
      ((b = document.getElementById("measure-" + b)),
      document.getElementById("measureWindow-" + a).appendChild(b),
      (d = 0),
      (d =
        j[2 * measureSegments + 1] > j[2 * measureSegments - 1]
          ? j[j.length - 1] - 8
          : j[j.length - 1] - 20),
      (b.style.left = j[j.length - 2] + "px"),
      (b.style.top = d + "px"));
  }
  e.style.visibility = "hidden";
  f.style.visibility = "visible";
  if ("Maps" == module || "Floorplans" == module || "pubMaps" == module)
    for (var K in layerInfo)
      ((document.getElementById(
        "drawingWindow-" + layerInfo[K].name + "-" + zoom,
      ).style.visibility = "hidden"),
        1 == layerInfo[K].toggle &&
          1 == layerInfo[K].e &&
          (document.getElementById(
            "drawingWindow-" + layerInfo[K].name + "-" + a,
          ).style.visibility = "visible"));
  if ("Maps" == module || "pubMaps" == module) {
    for (K in backgroundInfo)
      ((document.getElementById(
        "drawingWindow-" + backgroundInfo[K].name + "-" + zoom,
      ).style.visibility = "hidden"),
        1 == backgroundInfo[K].visible &&
          (document.getElementById(
            "drawingWindow-" + backgroundInfo[K].name + "-" + a,
          ).style.visibility = "visible"));
    for (K in labelInfo)
      ((document.getElementById(
        "drawingWindow-" + labelInfo[K].name + "-" + zoom,
      ).style.visibility = "hidden"),
        1 == labelInfo[K].visible &&
          (document.getElementById(
            "drawingWindow-" + labelInfo[K].name + "-" + a,
          ).style.visibility = "visible"));
  }
  document.getElementById("zoomButton-" + zoom) &&
    ((document.getElementById("zoomButton-" + zoom).className =
      "zoomUnselected"),
    (document.getElementById("zoomButton-" + a).className = "zoomSelected"));
  zoom = a;
  document.getElementById("keyLite") && Ea();
  if (document.getElementById("scaleBox")) {
    a = document.getElementById("scaleBox");
    e = zoomInfo[zoom + "-Base"].width / mapWidth;
    f = 10;
    for (K = e * f; 75 > K; ) ((f += 10), (K = e * f));
    a.innerHTML = "\x3ccenter\x3e" + f + "'\x3c/center\x3e";
    a.style.width = K + "px";
  }
  setTimeout(function () {
    V();
  }, 250);
  c && (shapeWindow.style.visibility = "");
  return M;
}
function ua(a) {
  var b = 0;
  a || (a = window.event);
  a.wheelDelta
    ? ((b = a.wheelDelta / 120), window.opera && (b = -b))
    : a.detail && (b = -a.detail / 3);
  var d = 0,
    c = 0;
  if (a.pageX || a.pageY) ((d = mousePosX), (c = mousePosY));
  else if (a.clientX || a.clientY)
    ((d =
      a.clientX +
      document.body.scrollLeft +
      document.documentElement.scrollLeft),
      (c =
        a.clientY +
        document.body.scrollTop +
        document.documentElement.scrollTop));
  b &&
    (0 < b
      ? zoom < maxZoom && ((b = zoom + 1), O(b, d, c))
      : 0 < zoom - 1 && ((b = zoom - 1), O(b, d, c)));
  a.preventDefault && a.preventDefault();
  a.returnValue = M;
}
function wa(a) {
  0 == startPinch && (startPinchZoom = zoom);
  startPinch = 1;
  a = 0;
  a = window.event;
  if (a) {
    var b = a.scale,
      d = mousePosX,
      c = mousePosY;
    1 != b &&
      (1 < b
        ? startPinchZoom < maxZoom &&
          ((b = Math.floor(startPinchZoom + b - 1)),
          b > maxZoom && (b = maxZoom),
          O(b, d, c))
        : 0 < startPinchZoom &&
          ((b = Math.ceil(startPinchZoom - 1 / b + 1)),
          0 >= b && (b = 0),
          O(b, d, c)));
    a.preventDefault && a.preventDefault();
  }
  a.returnValue = M;
}
function xa() {
  startPinch = 0;
}
function ca() {
  var a = document.getElementById("viewerWindow"),
    b = document.getElementById("drawingWindow-" + zoom);
  T(
    b,
    a.clientWidth / 2 - b.clientWidth * xy.x,
    a.clientHeight / 2 - b.clientHeight * xy.y,
  );
  V();
  document.getElementById("keyLite") && Ea();
}
function Ea() {
  if (document.getElementById("drawingWindow-" + zoom)) {
    var a = document.getElementById("keyLite"),
      b = document.getElementById("viewerWindow"),
      d = document.getElementById("drawingWindow-" + zoom),
      c = document.getElementById("thumb"),
      e = (b.clientWidth / d.clientWidth) * c.clientWidth;
    a.style.height = (b.clientHeight / d.clientHeight) * c.clientHeight + "px";
    a.style.width = e + "px";
    Z();
  }
}
function Z() {
  var a = document.getElementById("drawingWindow-" + zoom),
    b = document.getElementById("thumb");
  T(
    document.getElementById("keyLite"),
    -a.offsetLeft * (b.clientWidth / a.clientWidth),
    -a.offsetTop * (b.clientHeight / a.clientHeight),
  );
  U();
}
function ka(a, b) {
  if (keyliteclickoff == M) {
    a || (a = window.event);
    a.cancelBubble = J;
    a.stopPropagation && a.stopPropagation();
    var d = Da(document.getElementById("thumb")),
      c = Ca(),
      c = a.offsetY ? a.offsetY + thumbOffsetY : a.pageY - d.y - c[1];
    xy.x =
      (a.offsetX ? a.offsetX + thumbOffsetX : a.pageX - d.x) / b.clientWidth;
    xy.y = c / b.clientHeight;
    ca();
  }
  keyliteclickoff = M;
}
function Da(a) {
  if (a == L) return { x: 0, y: 0 };
  var b = Da(a.offsetParent);
  return {
    x: a.offsetLeft - a.scrollLeft + b.x,
    y: a.offsetTop - a.scrollTop + b.y,
  };
}
function Ca() {
  var a = 0,
    b = 0;
  if ("number" == typeof window.pageYOffset)
    ((b = window.pageYOffset), (a = window.pageXOffset));
  else if (
    document.body &&
    (document.body.scrollLeft || document.body.scrollTop)
  )
    ((b = document.body.scrollTop), (a = document.body.scrollLeft));
  else if (
    document.documentElement &&
    (document.documentElement.scrollLeft || document.documentElement.scrollTop)
  )
    ((b = document.documentElement.scrollTop),
      (a = document.documentElement.scrollLeft));
  return [a, b];
}
function Ja() {
  return M;
}
function ha(a) {
  var b = 0;
  a = a || window.event;
  a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
  a = 0;
  if (
    "CheckboxDisabled_16x16.gif" !=
    b.src.substring(b.src.length - 26, b.src.length)
  ) {
    var d = String(b.id),
      c;
    for (c in layerInfo) {
      var e = 0;
      if (layerInfo[c].name == d)
        if (1 == layerInfo[c].toggle && 0 == layerInfo[c].e)
          if (
            ((document.getElementById(
              "drawingWindow-" + layerInfo[c].name + "-" + zoom,
            ).style.visibility = "visible"),
            (layerInfo[c].e = 1),
            V(),
            (b.src = "/Media/Icons/Checkbox_16x16.gif"),
            layerInfo[c].name == layerInfo[c].b)
          )
            for (var f in layerInfo)
              layerInfo[c].b == layerInfo[f].b &&
                layerInfo[c].b != layerInfo[f].name &&
                (document.getElementById(layerInfo[f].name).src =
                  "/Media/Icons/CheckboxDisabled_16x16.gif");
          else
            document.getElementById(layerInfo[c].b) &&
              (document.getElementById(layerInfo[c].b).src =
                "/Media/Icons/CheckboxFilled_16x16.gif");
        else if (1 == layerInfo[c].toggle && 1 == layerInfo[c].e) {
          document.getElementById(
            "drawingWindow-" + layerInfo[c].name + "-" + zoom,
          ).style.visibility = "hidden";
          layerInfo[c].e = 0;
          V();
          b.src = "/Media/Icons/CheckboxEmpty_16x16.gif";
          if (layerInfo[c].name == layerInfo[c].b)
            for (f in layerInfo)
              layerInfo[c].b == layerInfo[f].b &&
                layerInfo[c].b != layerInfo[f].name &&
                (0 == layerInfo[f].e
                  ? (document.getElementById(layerInfo[f].name).src =
                      "/Media/Icons/CheckboxEmpty_16x16.gif")
                  : ((document.getElementById(layerInfo[f].name).src =
                      "/Media/Icons/Checkbox_16x16.gif"),
                    (e = 1)));
          else
            for (f in layerInfo)
              layerInfo[c].b == layerInfo[f].b &&
                1 == layerInfo[f].toggle &&
                1 == layerInfo[f].e &&
                (a = 1);
          0 == a &&
            document.getElementById(layerInfo[c].b) &&
            (document.getElementById(layerInfo[c].b).src =
              "/Media/Icons/CheckboxEmpty_16x16.gif");
          1 == e && (b.src = "/Media/Icons/CheckboxFilled_16x16.gif");
        }
    }
  }
  U();
}
function na(a) {
  var b = 0;
  a = a || window.event;
  a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
  var d = (a = "");
  "pubMaps" == module
    ? ((a = "/Media/Icons/RadioButton_16x16.gif"),
      (d = "/Media/Icons/RadioButtonEmpty_16x16.gif"))
    : ((a = "/Media/Icons/Checkbox_16x16.gif"),
      (d = "/Media/Icons/CheckboxEmpty_16x16.gif"));
  var c = 0,
    e = Q(String(b.id), "-"),
    f;
  for (f in backgroundInfo)
    if (backgroundInfo[f].c == e[1])
      if (0 == backgroundInfo[f].visible) {
        document.getElementById(
          "drawingWindow-" + backgroundInfo[f].name + "-" + zoom,
        ).style.visibility = "visible";
        backgroundInfo[f].visible = 1;
        V();
        c = document.getElementById("thumbPicture");
        if (!c) return;
        c.style.width = backgroundInfo[f].j + "px";
        c.style.height = backgroundInfo[f].i + "px";
        c.style.backgroundImage = "url(" + backgroundInfo[f].r + ")";
        thumbOffsetY = backgroundInfo[f].i * backgroundInfo[f].offsetY;
        thumbOffsetX = backgroundInfo[f].j * backgroundInfo[f].offsetX;
        c.style.top = thumbOffsetY + "px";
        c.style.left = thumbOffsetX + "px";
        b.src = a;
        c = 1;
      } else
        1 == backgroundInfo[f].visible &&
          ((document.getElementById(
            "drawingWindow-" + backgroundInfo[f].name + "-" + zoom,
          ).style.visibility = "hidden"),
          (backgroundInfo[f].visible = 0),
          V(),
          (b.src = d));
    else
      ((document.getElementById(
        "drawingWindow-" + backgroundInfo[f].name + "-" + zoom,
      ).style.visibility = "hidden"),
        (backgroundInfo[f].visible = 0),
        V(),
        (document.getElementById("background-" + backgroundInfo[f].c).src = d));
  c ||
    ((document.getElementById("thumbPicture").style.backgroundImage =
      "url(" + defaultThumb + ")"),
    (document.getElementById("thumbPicture").style.top = "0px"),
    (document.getElementById("thumbPicture").style.left = "0px"),
    (document.getElementById("thumbPicture").style.width =
      defaultThumbW + "px"),
    (document.getElementById("thumbPicture").style.height =
      defaultThumbH + "px"));
  U();
}
function oa(a) {
  var b = 0;
  a = a || window.event;
  a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
  labelName = Q(String(b.id), "-");
  for (var d in labelInfo)
    labelInfo[d].d == labelName[1]
      ? 0 == labelInfo[d].visible
        ? ((document.getElementById(
            "drawingWindow-" + labelInfo[d].name + "-" + zoom,
          ).style.visibility = "visible"),
          (labelInfo[d].visible = 1),
          V(),
          (b.src = "/Media/Icons/Checkbox_16x16.gif"))
        : 1 == labelInfo[d].visible &&
          ((document.getElementById(
            "drawingWindow-" + labelInfo[d].name + "-" + zoom,
          ).style.visibility = "hidden"),
          (labelInfo[d].visible = 0),
          V(),
          (b.src = "/Media/Icons/CheckboxEmpty_16x16.gif"))
      : ((document.getElementById(
          "drawingWindow-" + labelInfo[d].name + "-" + zoom,
        ).style.visibility = "hidden"),
        (labelInfo[d].visible = 0),
        V(),
        (document.getElementById("label-" + labelInfo[d].d).src =
          "/Media/Icons/CheckboxEmpty_16x16.gif"));
  U();
}
function $(a) {
  var b = 0;
  a = a || window.event;
  a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
  0 != b && (b.style.visibility = "");
}
String.prototype.trim = function () {
  return this.replace(/(^\s*)|(\s*$)/g, "");
};
function Q(a, b) {
  return a.trim().split(RegExp("\\s*" + b + "\\s*"));
}
function Ba() {
  var a;
  try {
    a = new XMLHttpRequest();
  } catch (b) {
    try {
      a = new ActiveXObject("Msxml2.XMLHTTP");
    } catch (d) {
      try {
        a = new ActiveXObject("Microsoft.XMLHTTP");
      } catch (c) {
        a = M;
      }
    }
  }
  a || alert("Error initializing XMLHttpRequest!");
  return a;
}
function X(a) {
  return "#" == a.charAt(0) ? a.substring(1, 7) : a;
}
function Fa(a) {
  document.getElementById("" + a + "") &&
    (document.getElementById("" + a + "").style.visibility = "hidden");
}
function W(a) {
  var b,
    d,
    c = [];
  b == L && (b = document);
  d == L && (d = "*");
  b = b.getElementsByTagName(d);
  d = b.length;
  a = RegExp("(^|\\s)" + a + "(\\s|$)");
  for (var e = 0, f = 0; e < d; e++)
    a.test(b[e].className) && ((c[f] = b[e]), f++);
  return c;
}
function N(a) {
  a = document.getElementById(a);
  if (a.click) a.click();
  else {
    var b = document.createEvent("MouseEvents");
    b.initMouseEvent("click", J, J, window, 0, 0, 0, 0, 0, M, M, J, M, 0, L);
    a.dispatchEvent(b);
  }
}
function Ka(a, b, d) {
  a = document.getElementById(a);
  if (a.click) a.click();
  else {
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent("click", J, J, window, 0, 0, 0, b, d, M, M, J, M, 0, L);
    a.dispatchEvent(c);
  }
}
function Ha() {
  var a = document.getElementById("pindiv-" + currentPopup + "-" + zoom);
  if (a.s) a.s();
  else {
    var b = document.createEvent("MouseEvents");
    b.initMouseEvent("mouseup", J, J, window, 0, 0, 0, 0, 0, M, M, J, M, 0, L);
    a.dispatchEvent(b);
  }
}
function P(a, b) {
  if (b != L && "" != b)
    for (var d = b.split(","), c = 0; c < d.length; c++) {
      var e = d[c],
        f = e + name;
      -1 < e.indexOf("\x3d") && ((f = e.split("\x3d")), (e = f[0]), (f = f[1]));
      a.addEventListener
        ? ("on" == e.substring(0, 2) && (e = e.substring(2)),
          a.addEventListener(e, eval(f), M),
          "click" == e && a.addEventListener("touchend", eval(f), M))
        : ("on" != e.substring(0, 2) && (e = "on" + e),
          a.attachEvent(e, eval(f)));
    }
}
window.mouseUp = va;
window.continueMove = function (a) {
  a || (a = window.event);
  if (a.pageX || a.pageY) ((mousePosX = a.pageX), (mousePosY = a.pageY));
  if (a.touches) {
    var b = a.targetTouches[1] != L ? a.targetTouches[1].pageY : 0;
    mousePosX =
      (a.targetTouches[0].pageX +
        (a.targetTouches[1] != L ? a.targetTouches[1].pageX : 0)) /
      2;
    mousePosY = (a.targetTouches[0].pageY + b) / 2;
  }
  if ("Measure" == pointerMode) {
    pointPosX =
      a.pageX -
      document.getElementById("drawingWindow-" + zoom).offsetLeft -
      document.getElementById("viewerWindow").offsetLeft;
    pointPosY =
      a.pageY -
      document.getElementById("drawingWindow-" + zoom).offsetTop -
      document.getElementById("viewerWindow").offsetTop;
    a = pointPosX;
    var b = pointPosY,
      d = zoom;
    if (document.getElementById("measurePoly")) {
      for (
        var c = [], e = measurePoly.getShape().points, f = 0;
        f < measureSegments;
        f++
      )
        ((c[2 * f] = e[f].x), (c[2 * f + 1] = e[f].y));
      c[2 * measureSegments] = a;
      c[2 * measureSegments + 1] = b;
      "Poly" == pointerSubMode &&
        ((c[2 * measureSegments + 2] = c[0]),
        (c[2 * measureSegments + 3] = c[1]));
      measurePoly.setShape(c);
      for (
        var f = document.getElementById("measure-" + pointerSubMode),
          r = document.getElementById("measure-" + pointerSubMode + "-2"),
          p = 0,
          g = e[0].x,
          l = e[0].y,
          k = 0;
        k < e.length;
        k++
      )
        ((p += Math.sqrt(Math.pow(e[k].x - g, 2) + Math.pow(e[k].y - l, 2))),
          (g = e[k].x),
          (l = e[k].y));
      e = p;
      "Line" == pointerSubMode &&
        ("Maps" == module || "pubMaps" == module
          ? ((d = mapWidth / zoomInfo[d + "-Base"].width),
            (d = Math.round(e * d)),
            (f.innerHTML = d + " ft"),
            (r.innerHTML = d + " ft"))
          : ((d = mapWidth / zoomInfo[d].width),
            (e *= d),
            (e /= 12),
            (d = Math.floor(e)),
            (e = Math.round(12 * (e - d))),
            (f.innerHTML = d + " ft " + e + " in"),
            (r.innerHTML = d + " ft " + e + " in")));
      r = 0;
      r =
        c[2 * measureSegments + 1] > c[2 * measureSegments - 1]
          ? b + 8
          : b - 20;
      f.style.left = a + "px";
      f.style.top = r + "px";
    }
  } else
    ismousedown == J
      ? startPinch || La(a, document.getElementById("drawingWindow-" + zoom))
      : ismousedownkey == J && La(a, document.getElementById("keyLite"));
};
window.setClickPos = ta;
window.hideThis = Fa;
window.thumbOffsetY = 0;
window.thumbOffsetX = 0;
window.returnFalse = function () {
  return M;
};
function Pa(a, b, d, c) {
  if ("GeometryCollection" == a.type)
    for (var e = 0; e < a.geometries.length; e++)
      c = Pa(a.geometries[e], b, d, c);
  else if ("MultiPolygon" == a.type)
    for (e = 0; e < a.coordinates.length; e++) {
      var f = a.coordinates[e];
      Qa(f, d, b, c);
      c++;
    }
  else ((f = a.coordinates), Qa(f, d, b, c), c++);
  return c;
}
function Qa(a, b, d, c) {
  var e = 0,
    f = 0,
    r = zoom;
  "Maps" == module || "pubMaps" == module
    ? ((f = zoomInfo[maxZoom + "-Base"].width),
      (e = zoomInfo[maxZoom + "-Base"].height),
      (thisZoomWidth = zoomInfo[r + "-Base"].width),
      (thisZoomHeight = zoomInfo[r + "-Base"].height))
    : ((f = zoomInfo[maxZoom].width),
      (e = zoomInfo[maxZoom].height),
      (thisZoomWidth = zoomInfo[r].width),
      (thisZoomHeight = zoomInfo[r].height));
  r = 0;
  1 < a.length && (r = 1);
  if (r) {
    r = a[0];
    bestPairs = {};
    if (r) {
      for (var p = [], g = 0; g < a[0].length; g++)
        ((p[2 * g] = r[g][0] * f), (p[2 * g + 1] = r[g][1] * e));
      p = b.createPolyline(p);
      g = p.getNode();
      g.setAttribute("id", "poly-" + d + "-outer-" + c);
      shapes["key-" + d + "-outer-" + c] = p;
    }
    for (var l = 1; l < a.length; l++) {
      var k = a[l];
      bestPairs[l] = { p: 1e9, n: 0, o: 0, l: 0, m: 0 };
      if (k) {
        p = [];
        for (g = 0; g < k.length; g++) {
          p[2 * g] = k[g][0] * f;
          p[2 * g + 1] = k[g][1] * e;
          for (var m = 0; m < r.length; m++) {
            var s = Math.abs(
              Math.sqrt(
                Math.pow(r[m][0] - k[g][0], 2) + Math.pow(r[m][1] - k[g][1], 2),
              ),
            );
            s < bestPairs[l].p &&
              ((bestPairs[l].p = s),
              (bestPairs[l].n = r[m][0]),
              (bestPairs[l].o = r[m][1]),
              (bestPairs[l].l = k[g][0]),
              (bestPairs[l].m = k[g][1]));
          }
        }
        p = b.createPolyline(p);
        g = p.getNode();
        g.setAttribute("id", "poly-" + d + "-inner-" + l + "-" + c);
        shapes["key-" + d + "-inner-" + l + "-" + c] = p;
      }
    }
    if (r) {
      p = [];
      for (g = s = 0; g < r.length; g++) {
        p[2 * g + s] = r[g][0] * f;
        p[2 * g + 1 + s] = r[g][1] * e;
        for (l = 1; l < a.length; l++)
          if (r[g][0] == bestPairs[l].n && r[g][1] == bestPairs[l].o) {
            for (var k = a[l], j = M, E = J, q = 0, m = 0; m < k.length; m++)
              (k[m][0] == bestPairs[l].l &&
                k[m][1] == bestPairs[l].m &&
                (j || (0 != m ? (q = m) : (E = M)), (j = J)),
                j &&
                  ((s += 2),
                  (p[2 * g + s] = k[m][0] * f),
                  (p[2 * g + 1 + s] = k[m][1] * e)));
            if (E)
              for (m = 0; m <= q; m++)
                ((s += 2),
                  (p[2 * g + s] = k[m][0] * f),
                  (p[2 * g + 1 + s] = k[m][1] * e));
            s += 2;
            p[2 * g + s] = r[g][0] * f;
            p[2 * g + 1 + s] = r[g][1] * e;
          }
      }
      p = b.createPolyline(p);
      g = p.getNode();
      g.setAttribute("id", "poly-" + d + "-fill-" + c);
      shapes["key-" + d + "-fill-" + c] = p;
    }
  } else if ((a = a[0])) {
    p = [];
    for (g = 0; g < a.length; g++)
      ((p[2 * g] = a[g][0] * f), (p[2 * g + 1] = a[g][1] * e));
    p = b.createPolyline(p);
    g = p.getNode();
    g.setAttribute("id", "poly-" + d + "-" + c);
    g.style.cursor = "pointer";
    shapes["key-" + d + "-" + c] = p;
  }
}
function Ga(a, b, d, c, e, f) {
  var r = 1,
    p = zoom,
    r = 0;
  "svg" == dojo.dojox.gfx.renderer && (r = Math.pow(2, maxZoom - p));
  var g = shapes["key-" + a];
  if (!g && ("poly" == e || "both" == e)) {
    if (geoJSON.polys[a]) {
      var g = shapeSurface.createGroup(),
        l = g.getNode();
      l.setAttribute("id", "poly-" + a);
      l.style.cursor = "pointer";
      g.connect("click", Ia);
      shapes["key-" + a] = g;
      Pa(geoJSON.polys[a], a, g, 0);
    }
    var g = Math.pow(2, maxZoom - zoom),
      k = (l = 0),
      m = 0,
      s = 0;
    "Maps" == module || "pubMaps" == module
      ? ((k = zoomInfo[maxZoom + "-Base"].width),
        (l = zoomInfo[maxZoom + "-Base"].height),
        (s = zoomInfo[zoom + "-Base"].width),
        (m = zoomInfo[zoom + "-Base"].height))
      : ((k = zoomInfo[maxZoom].width),
        (l = zoomInfo[maxZoom].height),
        (s = zoomInfo[zoom].width),
        (m = zoomInfo[zoom].height));
    shapes["key-" + a].applyTransform(
      dojox.gfx.matrix.scale({ x: s / k, y: m / l }),
    );
    if ("svg" == dojo.dojox.gfx.renderer) {
      l = 0;
      for (k = J; k == J; )
        if (
          shapes["key-" + a + "-outer-" + l] ||
          shapes["key-" + a + "-" + l]
        ) {
          shapes["key-" + a + "-outer-" + l] &&
            shapes["key-" + a + "-outer-" + l].setStroke({ width: g });
          m = 0;
          for (s = J; s == J; )
            shapes["key-" + a + "-inner-" + m + "-" + l]
              ? (shapes["key-" + a + "-inner-" + m + "-" + l].setStroke({
                  width: g,
                }),
                m++)
              : (s = M);
          shapes["key-" + a + "-" + l] &&
            shapes["key-" + a + "-" + l].setStroke({ width: g });
          l++;
        } else k = M;
    }
  }
  if (
    !document.getElementById("pindiv-" + a + "-" + p) &&
    ("pin" == e || "both" == e) &&
    f
  ) {
    p = centerInfo[a].f;
    g = centerInfo[a].g;
    k = l = 0;
    for (m = 1; m <= maxZoom; m++)
      ("Maps" == module || "pubMaps" == module
        ? ((k = zoomInfo[m + "-Base"].width),
          (l = zoomInfo[m + "-Base"].height))
        : ((k = zoomInfo[m].width), (l = zoomInfo[m].height)),
        (s = document.createElement("div")),
        document.getElementById("drawingWindow-" + m).appendChild(s),
        s.setAttribute("id", "pindiv-" + a + "-" + m),
        (s.style.position = "absolute"),
        (s.style.border = "1px solid rgb(171, 171, 171)"),
        (s.style.background = "white"),
        (s.style.zIndex = 1001),
        (s.innerHTML = window.addEventListener
          ? "\x3ccenter id\x3dpincenter-" +
            a +
            "-" +
            m +
            "\x3e" +
            f +
            "\x3c/center\x3e\x3cdiv id\x3dpincenterdiv-" +
            a +
            "-" +
            m +
            " style\x3d'width: 35px; height: 15px; overflow: hidden; z-index: 1; position: absolute; top: 18px; left: -5px;'\x3e\x3cimg id\x3dpincenterimg-" +
            a +
            "-" +
            m +
            " style\x3d'position: absolute; left: 5px; top: -770px; width: 690px; height: 786px; border: 0px none; padding: 0px; margin: 0px;' src\x3d'/media/popup/popup.png'\x3e\x3c/div\x3e"
          : "\x3ccenter id\x3dpincenter-" +
            a +
            "-" +
            m +
            "\x3e" +
            f +
            "\x3c/center\x3e\x3cdiv id\x3dpincenterdiv-" +
            a +
            "-" +
            m +
            " style\x3d'width: 35px; height: 15px; overflow: hidden; z-index: 1; position: absolute; top: 16px; left: -5px;'\x3e\x3cimg id\x3dpincenterimg-" +
            a +
            "-" +
            m +
            " style\x3d'position: absolute; left: 5px; top: -770px; width: 690px; height: 786px; border: 0px none; padding: 0px; margin: 0px;' src\x3d'/media/popup/popup.png'\x3e\x3c/div\x3e"),
        (s.style.left = p * k - 9 + "px"),
        (s.style.top = g * l - 32 + "px"),
        (s.style.width = "27px"),
        (s.style.height = "18px"),
        (s.style.visibility = ""),
        (s.style.cursor = "pointer"),
        s.setAttribute("class", "pindiv"),
        window.addEventListener
          ? (s.addEventListener("mouseup", Ia, M),
            s.addEventListener("touchend", Ia, M))
          : (s.onmouseup = Ia));
  }
  if ("poly" == e || "both" == e)
    if ((g = shapes["key-" + a])) {
      thisNode = g.getNode();
      thisNode.style.visibility = "";
      f = 0;
      for (p = J; p == J; )
        if (
          shapes["key-" + a + "-outer-" + f] ||
          shapes["key-" + a + "-" + f]
        ) {
          shapes["key-" + a + "-outer-" + f] &&
            shapes["key-" + a + "-outer-" + f].setStroke({
              width: r,
              color: [b, d, c, 1],
            });
          g = 1;
          for (l = J; l == J; )
            shapes["key-" + a + "-inner-" + g + "-" + f]
              ? (shapes["key-" + a + "-inner-" + g + "-" + f].setStroke({
                  width: r,
                  color: [b, d, c, 1],
                }),
                g++)
              : (l = M);
          shapes["key-" + a + "-fill-" + f] &&
            shapes["key-" + a + "-fill-" + f].setFill([b, d, c, 0.3]);
          shapes["key-" + a + "-" + f] &&
            shapes["key-" + a + "-" + f]
              .setStroke({ width: r, color: [b, d, c, 1] })
              .setFill([b, d, c, 0.3]);
          f++;
        } else p = M;
    }
  for (f = 1; f <= maxZoom; f++)
    if (
      ("pin" == e || "both" == e) &&
      document.getElementById("pindiv-" + a + "-" + f)
    )
      document.getElementById("pindiv-" + a + "-" + f).style.visibility = "";
}
function Y(a) {
  var b = shapes["key-" + a];
  b && (b.getNode().style.visibility = "hidden");
  for (b = 1; b <= maxZoom; b++)
    document.getElementById("pindiv-" + a + "-" + b) &&
      (document.getElementById("pindiv-" + a + "-" + b).style.visibility =
        "hidden");
}
function ya(a, b, d) {
  var c = document.getElementById(a + "_" + b + "_" + d + "_content")
    ? document.getElementById(a + "_" + b + "_" + d + "_content")
    : 0;
  if (
    0 ==
      (document.getElementById(a + "_" + b + "_" + d)
        ? document.getElementById(a + "_" + b + "_" + d)
        : 0) ||
    0 == c
  )
    return M;
  document.getElementById(
    a + "_" + tabSelectedTab[a] + "_content",
  ).style.display = "none";
  document.getElementById(a + "_" + tabSelectedTab[a] + "_on").style.display =
    "none";
  document.getElementById(a + "_" + tabSelectedTab[a] + "_off").style.display =
    "block";
  c.style.display = "block";
  document.getElementById(a + "_" + b + "_" + d + "_on").style.display =
    "block";
  document.getElementById(a + "_" + b + "_" + d + "_off").style.display =
    "none";
  tabSelectedTab[a] = b + "_" + d;
  "undefined" != typeof R && R();
}
window.tabRows = {};
window.tabRowTabs = {};
window.tabSelectedTab = {};
window.tabSelectedRow = {};
window.selectTab = ya;
window.tabOver = function (a) {
  a = a || window.event;
  a.preventDefault && a.preventDefault();
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  targ.style.background = "#dddddd";
  for (var b in targ.children)
    targ.children[b].style && (targ.children[b].style.background = "#dddddd");
  if (
    "verttabOff" == targ.parentNode.className ||
    "verttabOn" == targ.parentNode.className
  )
    targ.parentNode.style.background = "#dddddd";
};
window.tabOut = function (a) {
  a = a || window.event;
  a.preventDefault && a.preventDefault();
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  targ.style.background = "#eeeeee";
  for (var b in targ.children)
    targ.children[b].style && (targ.children[b].style.background = "#eeeeee");
  if (
    "verttabOff" == targ.parentNode.className ||
    "verttabOn" == targ.parentNode.className
  )
    targ.parentNode.style.background = "#eeeeee";
};
