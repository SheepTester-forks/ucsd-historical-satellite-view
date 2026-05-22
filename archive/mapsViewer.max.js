// https://maps.ucsd.edu/scripts/~1.81/Viewer/Maps/bin/mapsViewer.js

var _layersOn = false,
  L = null,
  _captureMouseEvents = true;
window.init = _init;
window.centerDrawing = _centerDrawing;
window.remoteToggleHighlight = _remoteToggleHighlight;
window.toggleHighlight = _toggleHighlight;
window.toggleAllHighlights = _toggleAllHighlights;
window.toggleOneHighlight = _toggleAllHighlights;
window.simulateClick = _simulateClick;
window.toggleLayer = _toggleLayer;
window.checkPinOverlap = _checkPinOverlap;
window.revealMenu = _revealMenu;
window.zoomImage = _zoomImage;
window.keyLiteClick = _keyLiteClick;
window.toggleSection = _toggleSection;
window.moveKeyMap = _moveKeyMap;
window.toggleBackground = _toggleBackground;
window.toggleLabel = _toggleLabel;
window.search = _search;
window.hideBubble = _hideBubble;
window.setPrintLink = _setPrintLink;
window.moveLeftConsole = _moveLeftConsole;
function _init(
  a = 0,
  b = "open",
  _leftConsoleButton = "closed",
  c = "open",
  _mkey = 1,
  _tile = 256,
  _path = "/tdb/Mapping/CampusMap/",
  _base = "CampusMap",
  _maxZoom = 7,
  _noZoom = true,
  _startingZoom = 0,
  _xy = { x: ".5", y: ".5" },
  _ext = ".png",
  _zoomInfo = ["... OMITTED ..."],
  _layerInfo = [],
  _backgroundInfo = ["... OMITTED ..."],
  _backgroundZoom = ["... OMITTED ..."],
  _rightConsoleButton = [],
  K = [],
  _mapWidth = 13500,
  _mapHeight = 12499.5,
  _centerInfo = ["... OMITTED ..."],
  _overlays = "",
  _startingPopup = "0",
  aa = 1,
) {
  _leftConsoleButton = document.getElementById("leftConsoleButton");
  _rightConsoleButton = document.getElementById("rightConsoleButton");
  P(document, "ondragstart=returnFalse");
  P(
    document,
    "mouseup=mouseUp,touchend=mouseUp,touchcancel=mouseUp,mousemove=continueMove,touchmove=continueMove",
  );
  document.getElementById("keyLite") &&
    (P(
      document.getElementById("keyLite"),
      "mousedown=setClickPos,touchstart=setClickPos",
    ),
    P(
      document.getElementById("keyLiteShade"),
      "mousedown=setClickPos,touchstart=setClickPos",
    ));
  _leftConsoleButton && P(_leftConsoleButton, "click=moveLeftConsole");
  _rightConsoleButton && P(_rightConsoleButton, "click=moveRightConsole");
  P(
    document.getElementById("tabMenu_1_1_off"),
    "mouseover=tabOver,mouseout=tabOut",
  );
  window.module = "pubMaps";
  window.pointerMode = "Nav";
  window.pointerSubMode = "Nav";
  window.lastPointerSubMode = "Nav";
  window.clickposx = 0;
  window.clickposy = 0;
  window.startingPopup = _startingPopup;
  window.currentPopup = 0;
  window.startingPinCount = 0;
  window.scrollstartleft = 0;
  window.scrollstarttop = 0;
  window.ismousedown = _captureMouseEvents;
  window.ismousedownkey = _captureMouseEvents;
  window.keyliteclickoff = _captureMouseEvents;
  window.maxleft = 0;
  window.maxtop = 0;
  window.path = _path;
  window.base = _base;
  window.leftConsoleState = "open";
  window.keyMapState = "open";
  window.rightConsoleState = "closed";
  "open" == keyMapState &&
    -1 < navigator.appVersion.indexOf("Mobile") &&
    _moveKeyMap();
  dojo.require("dojox.gfx");
  window.maxZoom = _maxZoom;
  window.noZoom = _noZoom;
  0 != _startingZoom && (window.startingZoom = _startingZoom);
  window.xy = _xy;
  window.tile = _tile;
  window.ext = _ext + "?";
  window.mkey = _mkey;
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
  window.layersOn = _layersOn;
  window.canvases = [];
  window.canvasDrawn = [];
  window.shapes = {};
  window.shadeSection = "none";
  window.placeInfo = {};
  window.centerInfo = {};
  window.mapWidth = _mapWidth;
  window.mapHeight = _mapHeight;
  window.infoTypes = {};
  window.overlays = _split(String(_overlays), ",");
  for (_mkey = 0; _mkey < _zoomInfo.length; _mkey++)
    zoomInfo[1 * _zoomInfo[_mkey][0] + 1 + "-" + _zoomInfo[_mkey][1]] = {
      height: _zoomInfo[_mkey][2],
      width: _zoomInfo[_mkey][3],
    };
  for (_mkey = 0; _mkey < _layerInfo.length; _mkey++)
    layerInfo[_mkey] = {
      name: _layerInfo[_mkey][0],
      e: _layerInfo[_mkey][1],
      toggle: _layerInfo[_mkey][2],
      b: _layerInfo[_mkey][3],
      q: _layerInfo[_mkey][4],
      h: _layerInfo[_mkey][5],
    };
  for (_mkey = 0; _mkey < _backgroundInfo.length; _mkey++)
    backgroundInfo[_mkey] = {
      name: _backgroundInfo[_mkey][0],
      c: _backgroundInfo[_mkey][1],
      visible: _backgroundInfo[_mkey][2],
      offsetX: _backgroundInfo[_mkey][3],
      offsetY: _backgroundInfo[_mkey][4],
      h: _backgroundInfo[_mkey][11],
      r: _backgroundInfo[_mkey][5],
      j: _backgroundInfo[_mkey][6],
      i: _backgroundInfo[_mkey][7],
      I: _backgroundInfo[_mkey][8],
      K: _backgroundInfo[_mkey][9],
      J: _backgroundInfo[_mkey][10],
    };
  for (_mkey = 0; _mkey < _backgroundZoom.length; _mkey++)
    ((_zoomInfo = _backgroundZoom[_mkey][1] + 1),
      (backgroundZoom[_backgroundZoom[_mkey][0] + "-" + _zoomInfo] = {
        height: _backgroundZoom[_mkey][2],
        width: _backgroundZoom[_mkey][3],
      }));
  for (_mkey = 0; _mkey < _centerInfo.length; _mkey++)
    centerInfo[_centerInfo[_mkey][0]] = {
      f: _centerInfo[_mkey][1],
      g: _centerInfo[_mkey][2],
    };
  for (_backgroundZoom = 1; _backgroundZoom <= maxZoom; _backgroundZoom++) {
    _centerInfo = _backgroundZoom;
    _backgroundInfo = _layerInfo = 0;
    "Maps" == module || "pubMaps" == module
      ? ((_layerInfo = zoomInfo[_centerInfo + "-Base"].width),
        (_backgroundInfo = zoomInfo[_centerInfo + "-Base"].height))
      : ((_layerInfo = zoomInfo[_centerInfo].width),
        (_backgroundInfo = zoomInfo[_centerInfo].height));
    _zoomInfo = document.createElement("div");
    _zoomInfo.setAttribute("id", "drawingWindow-" + _centerInfo);
    _zoomInfo.setAttribute("name", "drawingWindow-" + _centerInfo);
    _zoomInfo.style.position = "absolute";
    _zoomInfo.style.width = "" + _layerInfo + "px";
    _zoomInfo.style.height = "" + _backgroundInfo + "px";
    _zoomInfo.style.MozUserSelect = "none";
    "sheets" == module && (_zoomInfo.style.border = "1px solid");
    _zoomInfo.style.visibility = 1 == _centerInfo ? "visible" : "hidden";
    _zoomInfo.style.top = "0px";
    _zoomInfo.style.left = "0px";
    _zoomInfo.style.cursor = "url('/Media/Cursors/openhand_8_8.cur'), default";
    _zoomInfo.style.zIndex = 0;
    window.addEventListener
      ? (_zoomInfo.addEventListener(
          "mousedown",
          _handleMouseDown,
          _captureMouseEvents,
        ),
        _zoomInfo.addEventListener(
          "touchstart",
          _handleMouseDown,
          _captureMouseEvents,
        ))
      : (_zoomInfo.onmousedown = _handleMouseDown);
    document.getElementById("viewerWindow").appendChild(_zoomInfo);
    window.addEventListener &&
      (_zoomInfo.addEventListener(
        "DOMMouseScroll",
        _handleMouseScroll,
        _captureMouseEvents,
      ),
      _zoomInfo.addEventListener(
        "gesturestart",
        _handleGestureStart,
        _captureMouseEvents,
      ),
      _zoomInfo.addEventListener(
        "gesturechange",
        _handleGestureChange,
        _captureMouseEvents,
      ),
      _zoomInfo.addEventListener(
        "gestureend",
        _handleGestureEnd,
        _captureMouseEvents,
      ));
    _zoomInfo.onmousewheel = _handleMouseScroll;
    window.zoom = 1;
    if ("Maps" == module || "Floorplans" == module || "pubMaps" == module) {
      var _key = undefined;
      for (_key in layerInfo)
        1 == layerInfo[_key].toggle &&
          ((_zoomInfo = document.createElement("div")),
          _zoomInfo.setAttribute(
            "id",
            "drawingWindow-" + layerInfo[_key].name + "-" + _centerInfo,
          ),
          _zoomInfo.setAttribute("name", "layer"),
          (_zoomInfo.style.position = "absolute"),
          "Maps" == module || "pubMaps" == module
            ? ((_zoomInfo.style.width =
                "" +
                zoomInfo[_centerInfo + "-" + layerInfo[_key].b].width +
                "px"),
              (_zoomInfo.style.height =
                "" +
                zoomInfo[_centerInfo + "-" + layerInfo[_key].b].height +
                "px"))
            : ((_zoomInfo.style.width = "" + _layerInfo + "px"),
              (_zoomInfo.style.height = "" + _backgroundInfo + "px")),
          (_zoomInfo.style.zIndex = layerInfo[_key].L),
          (_zoomInfo.style.visibility =
            1 == _centerInfo && 1 == layerInfo[_key].e ? "visible" : "hidden"),
          (_zoomInfo.style.top = "0px"),
          (_zoomInfo.style.left = "0px"),
          document
            .getElementById("drawingWindow-" + _centerInfo)
            .appendChild(_zoomInfo));
    }
    _layerInfo = undefined;
    _layerInfo = 0 == thumbOffsetY && 0 == thumbOffsetX ? 0 : 1;
    if ("Maps" == module || "pubMaps" == module) {
      for (_key in backgroundInfo)
        ((_zoomInfo = document.createElement("div")),
          _zoomInfo.setAttribute(
            "id",
            "drawingWindow-" + backgroundInfo[_key].name + "-" + _centerInfo,
          ),
          _zoomInfo.setAttribute("name", "background"),
          (_zoomInfo.style.position = "absolute"),
          "undefined" ==
            typeof backgroundZoom[backgroundInfo[_key].c + "-" + _centerInfo] &&
            (backgroundZoom[backgroundInfo[_key].c + "-" + _centerInfo] = {
              height: 0,
              width: 0,
            }),
          (_zoomInfo.style.width =
            "" +
            backgroundZoom[backgroundInfo[_key].c + "-" + _centerInfo].width +
            "px"),
          (_zoomInfo.style.height =
            "" +
            backgroundZoom[backgroundInfo[_key].c + "-" + _centerInfo].height +
            "px"),
          (_zoomInfo.style.zIndex = -2),
          1 == _centerInfo && 1 == backgroundInfo[_key].visible
            ? ((_zoomInfo.style.visibility = "visible"),
              0 == _layerInfo &&
                ((window.thumbOffsetY =
                  backgroundInfo[_key].i * backgroundInfo[_key].offsetY),
                (window.thumbOffsetX =
                  backgroundInfo[_key].j * backgroundInfo[_key].offsetX),
                (_layerInfo = 1)))
            : (_zoomInfo.style.visibility = "hidden"),
          (newTop =
            backgroundZoom[backgroundInfo[_key].c + "-" + _centerInfo].height *
            backgroundInfo[_key].offsetY),
          (newLeft =
            backgroundZoom[backgroundInfo[_key].c + "-" + _centerInfo].width *
            backgroundInfo[_key].offsetX),
          (_zoomInfo.style.top = newTop + "px"),
          (_zoomInfo.style.left = newLeft + "px"),
          document
            .getElementById("drawingWindow-" + _centerInfo)
            .appendChild(_zoomInfo));
      for (_key in labelInfo)
        ((_zoomInfo = document.createElement("div")),
          _zoomInfo.setAttribute(
            "id",
            "drawingWindow-" + labelInfo[_key].name + "-" + _centerInfo,
          ),
          _zoomInfo.setAttribute("name", "label"),
          (_zoomInfo.style.position = "absolute"),
          "undefined" ==
            typeof labelZoom[labelInfo[_key].c + "-" + _centerInfo] &&
            (labelZoom[labelInfo[_key].c + "-" + _centerInfo] = {
              height: 0,
              width: 0,
            }),
          (_zoomInfo.style.width =
            "" + labelZoom[labelInfo[_key].d + "-" + _centerInfo].width + "px"),
          (_zoomInfo.style.height =
            "" +
            labelZoom[labelInfo[_key].d + "-" + _centerInfo].height +
            "px"),
          (_zoomInfo.style.zIndex = 1001),
          (_zoomInfo.style.visibility =
            1 == _centerInfo && 1 == labelInfo[_key].visible
              ? "visible"
              : "hidden"),
          (newTop =
            labelZoom[labelInfo[_key].d + "-" + _centerInfo].height *
            labelInfo[_key].offsetY),
          (newLeft =
            labelZoom[labelInfo[_key].d + "-" + _centerInfo].width *
            labelInfo[_key].offsetX),
          (_zoomInfo.style.top = newTop + "px"),
          (_zoomInfo.style.left = newLeft + "px"),
          document
            .getElementById("drawingWindow-" + _centerInfo)
            .appendChild(_zoomInfo));
    }
    0 == _layerInfo && ((window.thumbOffsetX = 0), (window.thumbOffsetY = 0));
    _centerInfo = _backgroundZoom;
    "Maps" == module || "pubMaps" == module
      ? ((countX[_centerInfo] = Math.ceil(
          zoomInfo[_centerInfo + "-Base"].width / tile,
        )),
        (countY[_centerInfo] = Math.ceil(
          zoomInfo[_centerInfo + "-Base"].height / tile,
        )))
      : ((countX[_centerInfo] = Math.ceil(zoomInfo[_centerInfo].width / tile)),
        (countY[_centerInfo] = Math.ceil(zoomInfo[_centerInfo].height / tile)));
  }
  _key = zoomInfo[maxZoom + "-Base"].width;
  _backgroundZoom = zoomInfo[maxZoom + "-Base"].height;
  _centerInfo = document.createElement("div");
  _centerInfo.setAttribute("id", "shapeWindow");
  _centerInfo.style.position = "absolute";
  _centerInfo.style.width = "" + _key + "px";
  _centerInfo.style.height = "" + _backgroundZoom + "px";
  _centerInfo.style.zIndex = -1;
  document.getElementById("drawingWindow-1").appendChild(_centerInfo);
  window.shapeWindow = _centerInfo;
  window.shapeSurface = dojox.gfx.createSurface(
    _centerInfo,
    _key,
    _backgroundZoom,
  );
  shapeSurface.rawNode.style.zIndex = -1;
  "undefined" == typeof tabRows && (window.F = {});
  "undefined" == typeof tabRowTabs && (window.D = {});
  "undefined" == typeof tabSelectedTab && (window.H = {});
  "undefined" == typeof tabSelectedRow && (window.G = {});
  tabSelectedTab.tabMenu = "1_1";
  tabSelectedRow.tabMenu = "1";
  _backgroundZoom = _key = 1;
  for (
    _zoomInfo = _centerInfo = 0;
    document.getElementById("tabMenu_" + _key);
  ) {
    for (
      _centerInfo++;
      document.getElementById("tabMenu_" + _key + "_" + _backgroundZoom);
    )
      (_zoomInfo++, _backgroundZoom++);
    tabRowTabs["tabMenu_" + _centerInfo] = _zoomInfo;
    _key++;
    _zoomInfo = 0;
    _backgroundZoom = 1;
  }
  tabRows.tabMenu = _centerInfo;
  document.getElementById("tabMenu_1_1_content").style.display = "block";
  _key = 1;
  0 == _key && (_key = tabRows.tabMenu);
  _backgroundZoom = document.getElementById("tabMenu_" + _key)
    ? document.getElementById("tabMenu_" + _key)
    : 0;
  0 == _backgroundZoom &&
    ((_backgroundZoom = document.getElementById("tabMenu_1")
      ? document.getElementById("tabMenu_1")
      : 0),
    (_key = 1));
  0 != _backgroundZoom &&
    ((document.getElementById(
      "tabMenu_" + tabSelectedRow.tabMenu,
    ).style.display = "none"),
    (document.getElementById("tabMenu_" + _key).style.display = "block"),
    (tabSelectedRow.tabMenu = _key));
  ya("tabMenu", 1, 1);
  ya("tabMenu", 1, aa);
  _handleResize();
  za("bldgDiv");
  za("mapDiv");
  "closed" == c && _moveLeftConsole();
  "closed" == b && _moveKeyMap();
  0 < a && (document.getElementById("sheetsDiv").scrollTop = a);
  if (noZoom) {
    b = document.getElementById("viewerWindow");
    a = b.clientHeight;
    b = b.clientWidth;
    c = 1e8;
    for (_key = aa = 1; _key <= maxZoom; _key++)
      ((_centerInfo = document.getElementById("drawingWindow-" + _key)),
        (_backgroundZoom = _centerInfo.clientHeight),
        (_zoomInfo = _centerInfo.clientWidth),
        (_centerInfo = Math.abs(_backgroundZoom - a) + Math.abs(_zoomInfo - b)),
        _centerInfo < c &&
          _backgroundZoom < a &&
          _zoomInfo < b &&
          ((c = _centerInfo), (aa = _key)));
    _zoomImage(aa, 0, 0);
  } else _zoomImage(startingZoom, 0, 0);
  _centerDrawing();
  window.onresize = _handleResize;
  window.onorientationchange = _handleResize;
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
    a = "bldgInfo.htm?mkey=" + mkey;
    var d = Ba();
    d.open("GET", a, _layersOn);
    d.onreadystatechange = function () {
      if (4 == d.readyState)
        if (200 == d.status) {
          var a = d.responseText;
          if (a != L) {
            var a = _split(String(a), "~"),
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
                _simulateClick(overlays[a] + "-Off");
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
  var b = a + ".htm" + ("?mkey=" + mkey),
    d = Ba();
  d.open("GET", b, _layersOn);
  d.onreadystatechange = function () {
    if (4 == d.readyState)
      if (200 == d.status) {
        var b = d.responseText;
        b != L &&
          document.getElementById(a) &&
          ((document.getElementById(a).innerHTML = b),
          "bldgDiv" == a ? Aa("bldg") : "mapDiv" == a && Aa("maps"),
          _handleResize());
      } else
        404 == d.status
          ? alert("Request URL does not exist")
          : alert("Error: status code is " + request2.status);
  };
  d.send(L);
}
function _moveLeftConsole() {
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
  _handleResize();
}
function _moveKeyMap(a) {
  a || (a = window.event);
  a.cancelBubble = _layersOn;
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
function _handleResize() {
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
  var g = _split(String(tabSelectedTab.tabMenu), "_"),
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
  0 != currentPopup && (r = "\x26openPin=" + currentPopup.replace("%", "%25"));
  j =
    document.location.protocol +
    "//" +
    document.location.hostname +
    document.location.pathname +
    "?mkey=" +
    mkey +
    "\x26lc=" +
    leftConsoleState +
    "\x26km=" +
    keyMapState +
    "\x26rc=" +
    rightConsoleState +
    "\x26zoom=" +
    zoom +
    "\x26X=" +
    d +
    "\x26Y=" +
    e +
    "\x26layers=" +
    c +
    "\x26background=" +
    f +
    "\x26label=" +
    p +
    "\x26overlays=" +
    l +
    "\x26selectedTab=" +
    g[1] +
    r;
  e =
    "\x3ciframe width='600' height='600' frameborder='0' scrolling='no' marginheight='0' marginwidth='0' src='" +
    document.location.protocol +
    "//" +
    document.location.hostname +
    document.location.pathname +
    "embed/embed.htm?mkey=" +
    mkey +
    "\x26lc=" +
    leftConsoleState +
    "\x26km=" +
    keyMapState +
    "\x26rc=" +
    rightConsoleState +
    "\x26zoom=" +
    zoom +
    "\x26X=" +
    d +
    "\x26Y=" +
    e +
    "\x26layers=" +
    c +
    "\x26background=" +
    f +
    "\x26label=" +
    p +
    "\x26overlays=" +
    l +
    r +
    "'\x3e\x3c/iframe\x3e";
  e = e.replace("default.htm", "");
  a && (a.value = j);
  b && (b.value = e);
}
function _revealMenu(a) {
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
function _setPrintLink(a) {
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
  0 != currentPopup && (f = "\x26openPin=" + currentPopup.replace("%", "%25"));
  a.href =
    "print.htm?mkey=" +
    mkey +
    "\x26lc=" +
    leftConsoleState +
    "\x26km=" +
    keyMapState +
    "\x26rc=" +
    rightConsoleState +
    "\x26zoom=" +
    zoom +
    "\x26X=" +
    b +
    "\x26Y=" +
    c +
    "\x26layers=" +
    d +
    "\x26background=" +
    e +
    "\x26label=" +
    r +
    "\x26overlays=" +
    p +
    f;
}
function _toggleHighlight(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  a = _split(String(targ.className), "-");
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
          var e = _split(String(placeInfo[c].code), ":");
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
function _toggleAllHighlights(a, b, d) {
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
        d = _split(String(placeInfo[c].a), "%");
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
        d = _split(String(placeInfo[c].a), "%");
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
function _toggleAllHighlights(a, b, d, c) {
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
        var n = _split(String(placeInfo[q].a), "%"),
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
        n = _split(String(placeInfo[q].a), "%");
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
function _toggleSection(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  a = _split(String(targ.id), ":");
  "Off" == a[1] &&
    ((document.getElementById(a[0] + "InnerDiv").style.display = "block"),
    targ.setAttribute("id", a[0] + ":On"),
    (targ.src = "/Media/Trees/Collapse_16x16.gif"));
  "On" == a[1] &&
    ((document.getElementById(a[0] + "InnerDiv").style.display = "none"),
    targ.setAttribute("id", a[0] + ":Off"),
    (targ.src = "/Media/Trees/Expand_16x16.gif"));
  _handleResize();
}
function Ia(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  var b = _split(String(targ.id), "-");
  if (
    "polyline" != String(targ.nodeName) &&
    "shape" != String(targ.nodeName) &&
    "pin" != String(targ.id.substr(0, 3))
  ) {
    var b = _split(String(clickPoly.id), "-"),
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
    c = _split(String(b[1]), "%");
    c = "polyData" + c[1] + ".htm?bkey=" + c[0];
    var e = Ba();
    e.open("GET", c, _layersOn);
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
function _checkPinOverlap(a, b) {
  a = document.getElementById(a);
  b = document.getElementById(b);
  var d = document.getElementById("viewerWindow");
  0 > a.offsetTop + b.offsetTop && T(b, b.offsetLeft, -a.offsetTop + 10);
  0 > a.offsetLeft + b.offsetLeft && T(b, -a.offsetLeft + 10, b.offsetTop);
  b.offsetLeft + a.offsetLeft + a.clientWidth > d.clientWidth &&
    T(b, d.clientWidth - a.offsetLeft - a.clientWidth - 10, b.offsetTop);
  V();
}
function _hideBubble(a) {
  for (var b = 1; b <= maxZoom; b++)
    document.getElementById("pindiv-" + a + "-" + b) &&
      (document.getElementById("pindiv-" + a + "-" + b).style.visibility = "");
  currentPopup = 0;
  U();
  Fa("bubble-1");
}
function _search(a) {
  a = a || window.event;
  a.target ? (targ = a.target) : a.srcElement && (targ = a.srcElement);
  a = "search.htm?mkey=" + mkey + "\x26Keywords=" + targ.value;
  var b = Ba();
  b.open("GET", a, _layersOn);
  b.onreadystatechange = function () {
    if (4 == b.readyState)
      if (200 == b.status) {
        var a = b.responseText,
          a = _split(String(a), ":");
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
          _handleResize();
        }
      } else
        404 == b.status
          ? alert("Request URL does not exist")
          : alert("Error: status code is " + b.status);
  };
  b.send(L);
}
function _remoteToggleHighlight(a, b) {
  document.getElementById(a + "-" + b + "-Off")
    ? (_simulateClick(a + "-" + b + "-Off"),
      document.getElementById(a + ":Off") && _simulateClick(a + ":Off"),
      "ParkingRegion" == a
        ? document.getElementById("Parking" + b + ":Off") &&
          _simulateClick("Parking" + b + ":Off")
        : "FutureBuildingRegion" == a
          ? document.getElementById("Parking" + b + ":Off") &&
            _simulateClick("Parking" + b + ":Off")
          : "AffiliateBuildingRegion" == a
            ? document.getElementById("Parking" + b + ":Off") &&
              _simulateClick("Parking" + b + ":Off")
            : document.getElementById(b + ":Off") && _simulateClick(b + ":Off"))
    : _simulateClick(a + "-" + b + "-On");
}
window.v = _captureMouseEvents;
window.u = _captureMouseEvents;
window.w = _captureMouseEvents;
window.z = _captureMouseEvents;
window.divStretch = _captureMouseEvents;
window.divStretchTarget = "";
window.A = 0;
window.B = 0;
window.startPinch = 0;
window.C = 0;
window.t = 0;
window.thumbOffsetY = 0;
window.thumbOffsetX = 0;
function _handleMouseDown(a) {
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
      ((ismousedown = _layersOn),
        (document.onselectstart = Ja),
        a.touches ||
          (document.getElementById("drawingWindow-" + zoom).style.cursor =
            "url('/Media/Cursors/closedhand_8_8.cur'), default"));
    else if ("keyLite" == b.id || "keyLiteShade" == b.id)
      (a.touches ||
        (document.getElementById("keyLiteShade").style.cursor =
          "url('/Media/Cursors/closedhand_8_8.cur'), default"),
        (keyliteclickoff = ismousedownkey = _layersOn),
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
function _handleGestureStart(a) {
  a || (a = window.event);
  if (a) {
    var b = 0;
    a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
    a.cancelBubble = _layersOn;
    a.stopPropagation && a.stopPropagation();
    document.getElementById("drawingWindow-" + zoom).style.cursor =
      "url('/Media/Cursors/openhand_8_8.cur'), default";
    document.getElementById("keyLiteShade") &&
      (document.getElementById("keyLiteShade").style.cursor =
        "url('/Media/Cursors/openhand_8_8.cur'), default");
    ismousedownkey = ismousedownscroll = ismousedown = _captureMouseEvents;
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
  if (ismousedown == _layersOn) {
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
  } else if (ismousedownkey == _layersOn) {
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
    _bgInfoKey,
    __zoom,
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
    __zoom = zoom;
    e = document.getElementById("viewerWindow");
    var g = document.getElementById("drawingWindow-" + __zoom),
      _zoomlevel = __zoom - 1;
    for (_bgInfoKey in backgroundInfo)
      if (1 == backgroundInfo[_bgInfoKey].visible) {
        backgroundTop =
          backgroundZoom[backgroundInfo[_bgInfoKey].c + "-" + __zoom].height *
          backgroundInfo[_bgInfoKey].offsetY;
        backgroundLeft =
          backgroundZoom[backgroundInfo[_bgInfoKey].c + "-" + __zoom].width *
          backgroundInfo[_bgInfoKey].offsetX;
        backgroundCountX = Math.ceil(
          backgroundZoom[backgroundInfo[_bgInfoKey].c + "-" + __zoom].width /
            tile,
        );
        backgroundCountY = Math.ceil(
          backgroundZoom[backgroundInfo[_bgInfoKey].c + "-" + __zoom].height /
            tile,
        );
        for (
          var _x = Math.floor(
              Math.max((-g.offsetLeft - backgroundLeft) / tile, 0),
            ),
            _xMax = Math.floor(
              Math.min(
                (e.clientWidth - g.offsetLeft - backgroundLeft) / tile,
                backgroundCountX - 1,
              ),
            ),
            _yMin = Math.floor(
              Math.max((-g.offsetTop - backgroundTop) / tile, 0),
            ),
            _yMax = Math.floor(
              Math.min(
                (e.clientHeight - g.offsetTop - backgroundTop) / tile,
                backgroundCountY - 1,
              ),
            );
          _x <= _xMax;
          _x += 1
        )
          for (var _y = _yMin; _y <= _yMax; _y += 1) {
            var _htmlTileId =
              "Image-" +
              backgroundInfo[_bgInfoKey].name +
              "-" +
              _x +
              "x" +
              _y +
              "-" +
              __zoom;
            w = Math.min(
              tile,
              backgroundZoom[backgroundInfo[_bgInfoKey].c + "-" + __zoom]
                .width -
                _x * tile,
            );
            h = Math.min(
              tile,
              backgroundZoom[backgroundInfo[_bgInfoKey].c + "-" + __zoom]
                .height -
                _y * tile,
            );
            source =
              path +
              backgroundInfo[_bgInfoKey].name +
              "/~" +
              backgroundInfo[_bgInfoKey].h +
              "/" +
              _zoomlevel +
              "/" +
              _y +
              "/" +
              _x +
              ext;
            if (document.getElementById(_htmlTileId))
              document.getElementById(_htmlTileId).src = source;
            else {
              var n = document.createElement("img");
              n.setAttribute("id", _htmlTileId);
              n.setAttribute("name", _htmlTileId);
              9 != document.documentMode &&
                (window.addEventListener
                  ? ((n.style.visibility = "hidden"),
                    n.addEventListener("load", $, _captureMouseEvents))
                  : ((n.style.visibility = "hidden"), (n.onload = $)));
              n.style.border = "0px none";
              n.style.margin = "0px";
              n.style.padding = "0px";
              n.style.left = _x * tile + "px";
              n.style.top = _y * tile + "px";
              n.style.width = w + "px";
              n.style.height = h + "px";
              n.style.position = "absolute";
              n.style.zIndex = 0;
              n.src = source;
              document
                .getElementById(
                  "drawingWindow-" +
                    backgroundInfo[_bgInfoKey].name +
                    "-" +
                    __zoom,
                )
                .appendChild(n);
            }
          }
      }
  }
  if ("Maps" == module || "pubMaps" == module) {
    _bgInfoKey = zoom;
    __zoom = document.getElementById("viewerWindow");
    e = document.getElementById("drawingWindow-" + _bgInfoKey);
    var g = _bgInfoKey - 1,
      x;
    for (x in labelInfo)
      if (1 == labelInfo[x].visible) {
        labelTop =
          labelZoom[labelInfo[x].d + "-" + _bgInfoKey].height *
          labelInfo[x].offsetY;
        labelLeft =
          labelZoom[labelInfo[x].d + "-" + _bgInfoKey].width *
          labelInfo[x].offsetX;
        labelCountX = Math.ceil(
          labelZoom[labelInfo[x].d + "-" + _bgInfoKey].width / tile,
        );
        labelCountY = Math.ceil(
          labelZoom[labelInfo[x].d + "-" + _bgInfoKey].height / tile,
        );
        _yMax = Math.floor(
          Math.max(
            (-e.offsetLeft - labelLeft) / tile - 1,
            (0 - labelLeft) / tile,
          ),
        );
        _zoomlevel = Math.floor(
          Math.min(
            (__zoom.clientWidth - e.offsetLeft - labelLeft) / tile + 1,
            labelCountX - 1,
          ),
        );
        _xMax = Math.floor(
          Math.max((-e.offsetTop - labelTop) / tile - 1, (0 - labelTop) / tile),
        );
        for (
          _yMin = Math.floor(
            Math.min(
              (__zoom.clientHeight - e.offsetTop - labelTop) / tile + 1,
              labelCountY - 1,
            ),
          );
          _yMax <= _zoomlevel;
          _yMax += 1
        )
          for (_x = _xMax; _x <= _yMin; _x += 1)
            ((_y =
              "Image-" +
              labelInfo[x].name +
              "-" +
              _yMax +
              "x" +
              _x +
              "-" +
              _bgInfoKey),
              (w = Math.min(
                tile,
                labelZoom[labelInfo[x].d + "-" + _bgInfoKey].width -
                  _yMax * tile,
              )),
              (h = Math.min(
                tile,
                labelZoom[labelInfo[x].d + "-" + _bgInfoKey].height - _x * tile,
              )),
              (source =
                path +
                labelInfo[x].name +
                "/~" +
                labelInfo[x].h +
                "/" +
                g +
                "/" +
                _x +
                "/" +
                _yMax +
                ext),
              document.getElementById(_y)
                ? (document.getElementById(_y).src = source)
                : ((_htmlTileId = document.createElement("img")),
                  _htmlTileId.setAttribute("id", _y),
                  _htmlTileId.setAttribute("name", _y),
                  (_htmlTileId.style.visibility = "hidden"),
                  9 != document.documentMode &&
                    (window.addEventListener
                      ? ((_htmlTileId.style.visibility = "hidden"),
                        _htmlTileId.addEventListener(
                          "load",
                          $,
                          _captureMouseEvents,
                        ))
                      : ((_htmlTileId.style.visibility = "hidden"),
                        (_htmlTileId.onload = $))),
                  (_htmlTileId.style.border = "0px none"),
                  (_htmlTileId.style.margin = "0px"),
                  (_htmlTileId.style.padding = "0px"),
                  (_htmlTileId.style.left = _yMax * tile + "px"),
                  (_htmlTileId.style.top = _x * tile + "px"),
                  (_htmlTileId.style.width = w + "px"),
                  (_htmlTileId.style.height = h + "px"),
                  (_htmlTileId.style.position = "absolute"),
                  (_htmlTileId.style.zIndex = 0),
                  (_htmlTileId.src = source),
                  document
                    .getElementById(
                      "drawingWindow-" + labelInfo[x].name + "-" + _bgInfoKey,
                    )
                    .appendChild(_htmlTileId)));
      }
  }
  for (; f <= r; f += 1)
    for (x = p; x <= a; x += 1)
      if (
        ("Maps" != module &&
          "Floorplans" != module &&
          "pubMaps" != module &&
          ((g = "Image-" + f + "x" + x + "-" + zoom),
          (__zoom = Math.min(tile, zoomInfo[zoom].width - f * tile)),
          (_bgInfoKey = Math.min(tile, zoomInfo[zoom].height - x * tile)),
          (e = dig + "/" + b + "/" + x + "/" + f + ext),
          document.getElementById(g)
            ? (document.getElementById(g).src = e)
            : ((_zoomlevel = document.createElement("img")),
              _zoomlevel.setAttribute("id", g),
              _zoomlevel.setAttribute("name", g),
              9 != document.documentMode &&
                (window.addEventListener
                  ? ((_zoomlevel.style.visibility = "hidden"),
                    _zoomlevel.addEventListener("load", $, _captureMouseEvents))
                  : ((_zoomlevel.style.visibility = "hidden"),
                    (_zoomlevel.onload = $))),
              (_zoomlevel.style.border = "0px none"),
              (_zoomlevel.style.margin = "0px"),
              (_zoomlevel.style.padding = "0px"),
              (_zoomlevel.style.left = f * tile + "px"),
              (_zoomlevel.style.top = x * tile + "px"),
              (_zoomlevel.style.width = __zoom + "px"),
              (_zoomlevel.style.height = _bgInfoKey + "px"),
              (_zoomlevel.style.position = "absolute"),
              (_zoomlevel.style.zIndex = 0),
              (_zoomlevel.src = e),
              document
                .getElementById("drawingWindow-" + zoom)
                .appendChild(_zoomlevel))),
        "Maps" == module || "Floorplans" == module || "pubMaps" == module)
      )
        for (g in ((_bgInfoKey = f),
        (__zoom = x),
        (e = zoom),
        (g = undefined),
        layerInfo))
          if (1 == layerInfo[g].toggle && 1 == layerInfo[g].e) {
            _zoomlevel =
              "Image-" +
              layerInfo[g].name +
              "-" +
              _bgInfoKey +
              "x" +
              __zoom +
              "-" +
              e;
            _x = e - 1;
            _yMin = _xMax = 0;
            _yMax = "";
            if ("Maps" == module || "pubMaps" == module)
              ((_xMax = Math.min(
                tile,
                zoomInfo[e + "-" + layerInfo[g].b].width - _bgInfoKey * tile,
              )),
                (_yMin = Math.min(
                  tile,
                  zoomInfo[e + "-" + layerInfo[g].b].height - __zoom * tile,
                )),
                (_yMax = layerInfo[g].q
                  ? path +
                    layerInfo[g].b +
                    "/~" +
                    layerInfo[g].h +
                    "/_All/" +
                    _x +
                    "/" +
                    __zoom +
                    "/" +
                    _bgInfoKey +
                    ext
                  : path +
                    layerInfo[g].b +
                    "/~" +
                    layerInfo[g].h +
                    "/" +
                    layerInfo[g].name +
                    "/" +
                    _x +
                    "/" +
                    __zoom +
                    "/" +
                    _bgInfoKey +
                    ext));
            "Floorplans" == module &&
              ((_xMax = Math.min(tile, zoomInfo[e].width - _bgInfoKey * tile)),
              (_yMin = Math.min(tile, zoomInfo[e].height - __zoom * tile)),
              (_yMax =
                path +
                layerInfo[g].name +
                "/" +
                _x +
                "/" +
                __zoom +
                "/" +
                _bgInfoKey +
                ext));
            document.getElementById(_zoomlevel)
              ? (document.getElementById(_zoomlevel).src = _yMax)
              : ((_x = document.createElement("img")),
                _x.setAttribute("id", _zoomlevel),
                _x.setAttribute("name", _zoomlevel),
                9 != document.documentMode &&
                  (window.addEventListener
                    ? ((_x.style.visibility = "hidden"),
                      _x.addEventListener("load", $, _captureMouseEvents))
                    : ((_x.style.visibility = "hidden"), (_x.onload = $))),
                (_x.style.border = "0px none"),
                (_x.style.margin = "0px"),
                (_x.style.padding = "0px"),
                (_x.style.left = _bgInfoKey * tile + "px"),
                (_x.style.top = __zoom * tile + "px"),
                (_x.style.width = _xMax + "px"),
                (_x.style.height = _yMin + "px"),
                (_x.style.position = "absolute"),
                (_x.style.zIndex = 0),
                (_x.src = _yMax),
                document
                  .getElementById(
                    "drawingWindow-" + layerInfo[g].name + "-" + e,
                  )
                  .appendChild(_x));
          }
}
function _zoomImage(a, b, d) {
  var c = _captureMouseEvents;
  document.getElementById("shapeWindow") &&
    ((shapeWindow.style.visibility = "hidden"), (c = _layersOn));
  if (document.getElementById("drawingWindow-" + a))
    var e = document.getElementById("drawingWindow-" + zoom),
      f = document.getElementById("drawingWindow-" + a);
  else return _captureMouseEvents;
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
        ((m = _split(String(j), "-")),
        !m[2] &&
          (shapes[j].applyTransform(dojox.gfx.matrix.scale({ x: b, y: d })),
          "svg" == dojo.dojox.gfx.renderer))
      )
        for (var m = m[1], s = 0, E = _layersOn, q = ""; E == _layersOn; )
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
            for (var n = 1, x = _layersOn; x == _layersOn; )
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
                : (x = _captureMouseEvents);
            shapes["key-" + m + "-" + s] &&
              ((q = shapes["key-" + m + "-" + s].strokeStyle.color.toRgb()),
              shapes["key-" + m + "-" + s].setStroke({ width: k, color: q }));
            s++;
          } else E = _captureMouseEvents;
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
  return _captureMouseEvents;
}
function _handleMouseScroll(a) {
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
      ? zoom < maxZoom && ((b = zoom + 1), _zoomImage(b, d, c))
      : 0 < zoom - 1 && ((b = zoom - 1), _zoomImage(b, d, c)));
  a.preventDefault && a.preventDefault();
  a.returnValue = _captureMouseEvents;
}
function _handleGestureChange(a) {
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
          _zoomImage(b, d, c))
        : 0 < startPinchZoom &&
          ((b = Math.ceil(startPinchZoom - 1 / b + 1)),
          0 >= b && (b = 0),
          _zoomImage(b, d, c)));
    a.preventDefault && a.preventDefault();
  }
  a.returnValue = _captureMouseEvents;
}
function _handleGestureEnd() {
  startPinch = 0;
}
function _centerDrawing() {
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
function _keyLiteClick(a, b) {
  if (keyliteclickoff == _captureMouseEvents) {
    a || (a = window.event);
    a.cancelBubble = _layersOn;
    a.stopPropagation && a.stopPropagation();
    var d = Da(document.getElementById("thumb")),
      c = Ca(),
      c = a.offsetY ? a.offsetY + thumbOffsetY : a.pageY - d.y - c[1];
    xy.x =
      (a.offsetX ? a.offsetX + thumbOffsetX : a.pageX - d.x) / b.clientWidth;
    xy.y = c / b.clientHeight;
    _centerDrawing();
  }
  keyliteclickoff = _captureMouseEvents;
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
  return _captureMouseEvents;
}
function _toggleLayer(a) {
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
function _toggleBackground(a) {
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
    e = _split(String(b.id), "-"),
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
function _toggleLabel(a) {
  var b = 0;
  a = a || window.event;
  a.target ? (b = a.target) : a.srcElement && (b = a.srcElement);
  labelName = _split(String(b.id), "-");
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
function _split(_string, _separator) {
  return _string.trim().split(RegExp("\\s*" + _separator + "\\s*"));
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
        a = _captureMouseEvents;
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
function _simulateClick(a) {
  a = document.getElementById(a);
  if (a.click) a.click();
  else {
    var b = document.createEvent("MouseEvents");
    b.initMouseEvent(
      "click",
      _layersOn,
      _layersOn,
      window,
      0,
      0,
      0,
      0,
      0,
      _captureMouseEvents,
      _captureMouseEvents,
      _layersOn,
      _captureMouseEvents,
      0,
      L,
    );
    a.dispatchEvent(b);
  }
}
function Ka(a, b, d) {
  a = document.getElementById(a);
  if (a.click) a.click();
  else {
    var c = document.createEvent("MouseEvents");
    c.initMouseEvent(
      "click",
      _layersOn,
      _layersOn,
      window,
      0,
      0,
      0,
      b,
      d,
      _captureMouseEvents,
      _captureMouseEvents,
      _layersOn,
      _captureMouseEvents,
      0,
      L,
    );
    a.dispatchEvent(c);
  }
}
function Ha() {
  var a = document.getElementById("pindiv-" + currentPopup + "-" + zoom);
  if (a.s) a.s();
  else {
    var b = document.createEvent("MouseEvents");
    b.initMouseEvent(
      "mouseup",
      _layersOn,
      _layersOn,
      window,
      0,
      0,
      0,
      0,
      0,
      _captureMouseEvents,
      _captureMouseEvents,
      _layersOn,
      _captureMouseEvents,
      0,
      L,
    );
    a.dispatchEvent(b);
  }
}
function P(a, b) {
  if (b != L && "" != b)
    for (var d = b.split(","), c = 0; c < d.length; c++) {
      var e = d[c],
        f = e + name;
      -1 < e.indexOf("=") && ((f = e.split("=")), (e = f[0]), (f = f[1]));
      a.addEventListener
        ? ("on" == e.substring(0, 2) && (e = e.substring(2)),
          a.addEventListener(e, eval(f), _captureMouseEvents),
          "click" == e &&
            a.addEventListener("touchend", eval(f), _captureMouseEvents))
        : ("on" != e.substring(0, 2) && (e = "on" + e),
          a.attachEvent(e, eval(f)));
    }
}
window.mouseUp = _handleGestureStart;
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
    ismousedown == _layersOn
      ? startPinch || La(a, document.getElementById("drawingWindow-" + zoom))
      : ismousedownkey == _layersOn &&
        La(a, document.getElementById("keyLite"));
};
window.setClickPos = _handleMouseDown;
window.hideThis = Fa;
window.thumbOffsetY = 0;
window.thumbOffsetX = 0;
window.returnFalse = function () {
  return _captureMouseEvents;
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
            for (
              var k = a[l],
                j = _captureMouseEvents,
                E = _layersOn,
                q = 0,
                m = 0;
              m < k.length;
              m++
            )
              (k[m][0] == bestPairs[l].l &&
                k[m][1] == bestPairs[l].m &&
                (j || (0 != m ? (q = m) : (E = _captureMouseEvents)),
                (j = _layersOn)),
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
      for (k = _layersOn; k == _layersOn; )
        if (
          shapes["key-" + a + "-outer-" + l] ||
          shapes["key-" + a + "-" + l]
        ) {
          shapes["key-" + a + "-outer-" + l] &&
            shapes["key-" + a + "-outer-" + l].setStroke({ width: g });
          m = 0;
          for (s = _layersOn; s == _layersOn; )
            shapes["key-" + a + "-inner-" + m + "-" + l]
              ? (shapes["key-" + a + "-inner-" + m + "-" + l].setStroke({
                  width: g,
                }),
                m++)
              : (s = _captureMouseEvents);
          shapes["key-" + a + "-" + l] &&
            shapes["key-" + a + "-" + l].setStroke({ width: g });
          l++;
        } else k = _captureMouseEvents;
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
          ? "\x3ccenter id=pincenter-" +
            a +
            "-" +
            m +
            "\x3e" +
            f +
            "\x3c/center\x3e\x3cdiv id=pincenterdiv-" +
            a +
            "-" +
            m +
            " style='width: 35px; height: 15px; overflow: hidden; z-index: 1; position: absolute; top: 18px; left: -5px;'\x3e\x3cimg id=pincenterimg-" +
            a +
            "-" +
            m +
            " style='position: absolute; left: 5px; top: -770px; width: 690px; height: 786px; border: 0px none; padding: 0px; margin: 0px;' src='/media/popup/popup.png'\x3e\x3c/div\x3e"
          : "\x3ccenter id=pincenter-" +
            a +
            "-" +
            m +
            "\x3e" +
            f +
            "\x3c/center\x3e\x3cdiv id=pincenterdiv-" +
            a +
            "-" +
            m +
            " style='width: 35px; height: 15px; overflow: hidden; z-index: 1; position: absolute; top: 16px; left: -5px;'\x3e\x3cimg id=pincenterimg-" +
            a +
            "-" +
            m +
            " style='position: absolute; left: 5px; top: -770px; width: 690px; height: 786px; border: 0px none; padding: 0px; margin: 0px;' src='/media/popup/popup.png'\x3e\x3c/div\x3e"),
        (s.style.left = p * k - 9 + "px"),
        (s.style.top = g * l - 32 + "px"),
        (s.style.width = "27px"),
        (s.style.height = "18px"),
        (s.style.visibility = ""),
        (s.style.cursor = "pointer"),
        s.setAttribute("class", "pindiv"),
        window.addEventListener
          ? (s.addEventListener("mouseup", Ia, _captureMouseEvents),
            s.addEventListener("touchend", Ia, _captureMouseEvents))
          : (s.onmouseup = Ia));
  }
  if ("poly" == e || "both" == e)
    if ((g = shapes["key-" + a])) {
      thisNode = g.getNode();
      thisNode.style.visibility = "";
      f = 0;
      for (p = _layersOn; p == _layersOn; )
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
          for (l = _layersOn; l == _layersOn; )
            shapes["key-" + a + "-inner-" + g + "-" + f]
              ? (shapes["key-" + a + "-inner-" + g + "-" + f].setStroke({
                  width: r,
                  color: [b, d, c, 1],
                }),
                g++)
              : (l = _captureMouseEvents);
          shapes["key-" + a + "-fill-" + f] &&
            shapes["key-" + a + "-fill-" + f].setFill([b, d, c, 0.3]);
          shapes["key-" + a + "-" + f] &&
            shapes["key-" + a + "-" + f]
              .setStroke({ width: r, color: [b, d, c, 1] })
              .setFill([b, d, c, 0.3]);
          f++;
        } else p = _captureMouseEvents;
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
    return _captureMouseEvents;
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
  "undefined" != typeof _handleResize && _handleResize();
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

// https://maps.ucsd.edu/mapping/viewer/default.htm
window.onload = function () {
  init(
    0,
    "open",
    "closed",
    "open",
    1,
    256,
    "/tdb/Mapping/CampusMap/",
    "CampusMap",
    7,
    true,
    0,
    { x: ".5", y: ".5" },
    ".png",
    [
      [0, "Fire", 391, 422],
      [0, "Civil", 391, 422],
      [0, "Clery", 391, 422],
      [0, "Utilities", 391, 422],
      [0, "Telecomm", 391, 422],
      [0, "Real_Estate", 391, 422],
      [0, "Lighting", 391, 422],
      [0, "Buildings", 391, 422],
      [0, "Base", 391, 422],
      [0, "Landscape", 391, 422],
      [1, "Buildings", 782, 844],
      [1, "Base", 782, 844],
      [1, "Civil", 782, 844],
      [1, "Fire", 782, 844],
      [1, "Landscape", 782, 844],
      [1, "Lighting", 782, 844],
      [1, "Real_Estate", 782, 844],
      [1, "Telecomm", 782, 844],
      [1, "Utilities", 782, 844],
      [1, "Clery", 782, 844],
      [2, "Utilities", 1563, 1688],
      [2, "Real_Estate", 1563, 1688],
      [2, "Buildings", 1563, 1688],
      [2, "Landscape", 1563, 1688],
      [2, "Telecomm", 1563, 1688],
      [2, "Base", 1563, 1688],
      [2, "Civil", 1563, 1688],
      [2, "Clery", 1563, 1688],
      [2, "Lighting", 1563, 1688],
      [2, "Fire", 1563, 1688],
      [3, "Buildings", 3125, 3375],
      [3, "Base", 3125, 3375],
      [3, "Fire", 3125, 3375],
      [3, "Clery", 3125, 3375],
      [3, "Landscape", 3125, 3375],
      [3, "Real_Estate", 3125, 3375],
      [3, "Telecomm", 3125, 3375],
      [3, "Lighting", 3125, 3375],
      [3, "Utilities", 3125, 3375],
      [3, "Civil", 3125, 3375],
      [4, "Base", 6250, 6750],
      [4, "Telecomm", 6250, 6750],
      [4, "Civil", 6250, 6750],
      [4, "Landscape", 6250, 6750],
      [4, "Buildings", 6250, 6750],
      [4, "Lighting", 6250, 6750],
      [4, "Utilities", 6250, 6750],
      [4, "Real_Estate", 6250, 6750],
      [4, "Fire", 6250, 6750],
      [4, "Clery", 6250, 6750],
      [5, "Clery", 12500, 13500],
      [5, "Fire", 12500, 13500],
      [5, "Landscape", 12500, 13500],
      [5, "Lighting", 12500, 13500],
      [5, "Base", 12500, 13500],
      [5, "Real_Estate", 12500, 13500],
      [5, "Telecomm", 12500, 13500],
      [5, "Utilities", 12500, 13500],
      [5, "Buildings", 12500, 13500],
      [5, "Civil", 12500, 13500],
      [6, "Lighting", 24999, 27000],
      [6, "Clery", 24999, 27000],
      [6, "Fire", 24999, 27000],
      [6, "Buildings", 24999, 27000],
      [6, "Base", 24999, 27000],
      [6, "Utilities", 24999, 27000],
      [6, "Landscape", 24999, 27000],
      [6, "Civil", 25000, 27000],
      [6, "Telecomm", 24999, 27000],
      [6, "Real_Estate", 24999, 27000],
    ],
    [],
    [
      [
        "Parking",
        "1",
        1,
        0.0218,
        0.00905,
        "/tdb/Mapping/CampusMap/Parking/Keymap.png",
        202,
        202,
        "/tdb/Mapping/CampusMap/Parking/Keymap.png",
        250,
        250,
        "2016011412345425223908",
      ],
      [
        "Aerial2002",
        "10",
        0,
        -0.00525,
        -0.01025,
        "/tdb/Mapping/CampusMap/Aerial2002/Keymap.png",
        228,
        205,
        "/tdb/Mapping/CampusMap/Aerial2002/Keymap.png",
        250,
        224,
        "2012041211273981563607",
      ],
      [
        "Aerial1964",
        "11",
        0,
        -0.0015,
        -0.011,
        "/tdb/Mapping/CampusMap/Aerial1964/Keymap.png",
        252,
        198,
        "/tdb/Mapping/CampusMap/Aerial1964/Keymap.png",
        250,
        196,
        "2012041211273981563607",
      ],
      [
        "Aerial1973",
        "12",
        0,
        0.01,
        -0.03,
        "/tdb/Mapping/CampusMap/Aerial1973/Keymap.png",
        210,
        207,
        "/tdb/Mapping/CampusMap/Aerial1973/Keymap.png",
        250,
        246,
        "2012041211273981563607",
      ],
      [
        "Aerial1983",
        "13",
        0,
        0.027,
        -0.0175,
        "/tdb/Mapping/CampusMap/Aerial1983/Keymap.png",
        207,
        202,
        "/tdb/Mapping/CampusMap/Aerial1983/Keymap.png",
        250,
        243,
        "2012041211273981563607",
      ],
      [
        "Aerial1994",
        "14",
        0,
        0.011,
        -0.0172,
        "/tdb/Mapping/CampusMap/Aerial1994/Keymap.png",
        206,
        202,
        "/tdb/Mapping/CampusMap/Aerial1994/Keymap.png",
        250,
        245,
        "2012041211273981563607",
      ],
      [
        "Aerial2012",
        "15",
        0,
        -0.0493093742880457,
        -0.256504994717481,
        "/tdb/Mapping/CampusMap/Aerial2012/Keymap.png",
        311,
        464,
        "/tdb/Mapping/CampusMap/Aerial2012/Keymap.png",
        168,
        250,
        "2013010810150699617708",
      ],
      [
        "Aerial2010",
        "4",
        0,
        -0.083526615,
        -0.20475,
        "/tdb/Mapping/CampusMap/Aerial2010/Keymap.png",
        246,
        341,
        "/tdb/Mapping/CampusMap/Aerial2010/Keymap.png",
        180,
        250,
        "2012041211273981563607",
      ],
      [
        "Aerial2005",
        "7",
        0,
        -0.0055,
        -0.01,
        "/tdb/Mapping/CampusMap/Aerial2005/Keymap.png",
        228,
        205,
        "/tdb/Mapping/CampusMap/Aerial2005/Keymap.png",
        250,
        224,
        "2012041211273981563607",
      ],
      [
        "Aerial1999",
        "8",
        0,
        0.0035,
        0.00025,
        "/tdb/Mapping/CampusMap/Aerial1999/Keymap.png",
        211,
        196,
        "/tdb/Mapping/CampusMap/Aerial1999/Keymap.png",
        250,
        231,
        "2012041211273981563607",
      ],
      [
        "Aerial2008",
        "9",
        0,
        -0.00525,
        -0.01025,
        "/tdb/Mapping/CampusMap/Aerial2008/Keymap.png",
        228,
        205,
        "/tdb/Mapping/CampusMap/Aerial2008/Keymap.png",
        250,
        224,
        "2012041211273981563607",
      ],
    ],
    [
      [11, 0, 395, 503],
      [11, 1, 790, 1006],
      [11, 2, 1580, 2012],
      [11, 3, 3161, 4025],
      [11, 4, 6321, 8049],
      [11, 5, 12641, 16096],
      [12, 0, 413, 419],
      [12, 1, 827, 838],
      [12, 2, 1653, 1677],
      [12, 3, 3306, 3353],
      [12, 4, 6612, 6706],
      [12, 5, 13224, 13413],
      [13, 0, 403, 414],
      [13, 1, 806, 828],
      [13, 2, 1613, 1656],
      [13, 3, 3225, 3312],
      [13, 4, 6450, 6624],
      [13, 5, 12900, 13248],
      [14, 0, 404, 412],
      [14, 1, 807, 824],
      [14, 2, 1615, 1648],
      [14, 3, 3229, 3296],
      [14, 4, 6457, 6591],
      [14, 5, 12914, 13182],
      [8, 0, 391, 422],
      [8, 1, 781, 844],
      [8, 2, 1563, 1688],
      [8, 3, 3125, 3375],
      [8, 4, 6250, 6750],
      [8, 5, 12500, 13500],
      [10, 0, 409, 455],
      [10, 1, 818, 911],
      [10, 2, 1635, 1821],
      [10, 3, 3270, 3642],
      [10, 4, 6540, 7284],
      [10, 5, 13080, 14568],
      [7, 0, 409, 455],
      [7, 1, 818, 911],
      [7, 2, 1635, 1821],
      [7, 3, 3270, 3643],
      [7, 4, 6540, 7285],
      [7, 5, 13080, 14570],
      [9, 0, 409, 455],
      [9, 1, 818, 911],
      [9, 2, 1635, 1821],
      [9, 3, 3270, 3642],
      [9, 4, 6540, 7284],
      [9, 5, 13080, 14568],
      [4, 0, 682, 492],
      [4, 1, 1364, 985],
      [4, 2, 2728, 1969],
      [4, 3, 5456, 3938],
      [4, 4, 10913, 7877],
      [4, 5, 21825, 15753],
      [4, 6, 43650, 31506],
      [15, 0, 927, 622],
      [15, 1, 1855, 1244],
      [15, 2, 3710, 2488],
      [15, 3, 7420, 4976],
      [15, 4, 14840, 9953],
      [15, 5, 29679, 19906],
      [15, 6, 59358, 39811],
      [1, 0, 405, 405],
      [1, 1, 810, 810],
      [1, 2, 1620, 1620],
      [1, 3, 3239, 3239],
      [1, 4, 6478, 6478],
      [1, 5, 12956, 12956],
      [1, 6, 25912, 25912],
    ],
    [],
    [],
    13500,
    12499.5,
    [
      ["1%2", 0.116284, 0.895452],
      ["1%5", 0.385837, 0.282142],
      ["1%7", 0.506566, 0.395798],
      ["1%4", 0.891402, 0.527344],
      ["10%2", 0.143777, 0.743638],
      ["10%1", 0.514095, 0.511],
      ["10%3", 0.795067, 0.603407],
      ["10%5", 0.866321, 0.535895],
      ["100%2", 0.547694, 0.625663],
      ["1001796%1", 0.860505, 0.600094],
      ["1001798%1", 0.771965, 0.5884],
      ["1001799%1", 0.784311, 0.579322],
      ["1001800%1", 0.788296, 0.615127],
      ["1001802%1", 0.87612, 0.602549],
      ["1001803%1", 0.921976, 0.60875],
      ["1001804%1", 0.918982, 0.595387],
      ["1001805%1", 0.88154, 0.590701],
      ["1001806%1", 0.863709, 0.581642],
      ["1001807%1", 0.41102271386484307, 0.4221028164880384],
      ["1001808%1", 0.3984108893930291, 0.4222450041516054],
      ["1001809%1", 0.3657944118462641, 0.4209488346445568],
      ["1001810%1", 0.36703082944121623, 0.4440900087869094],
      ["1001811%1", 0.3913601375417956, 0.4425424454208805],
      ["1001812%1", 0.4064612135809881, 0.4442903646627967],
      ["1001814%1", 0.6657136726055846, 0.3948554769201764],
      ["1001818%1", 0.6759829230415807, 0.2904017987123101],
      ["1001843%1", 0.388359, 0.635392],
      ["101%1", 0.827776, 0.355898],
      ["102%2", 0.511735, 0.583775],
      ["1025%1", 0.50841, 0.640742],
      ["1028%1", 0.498039, 0.613008],
      ["1029%1", 0.4860716146108246, 0.633207424885565],
      ["103%2", 0.464498, 0.57027],
      ["1035%1", 0.679613, 0.314225],
      ["1037%1", 0.7359329668304848, 0.49313684108133093],
      ["104%2", 0.530289, 0.561002],
      ["1040%1", 0.42824895741055824, 0.173848553077792],
      ["105%2", 0.532034, 0.66544],
      ["106%2", 0.483558, 0.625708],
      ["107%2", 0.72247, 0.418415],
      ["108%1", 0.26225, 0.750365],
      ["108%2", 0.813775, 0.400211],
      ["109%1", 0.259177, 0.740817],
      ["109%2", 0.872455, 0.442953],
      ["11%2", 0.177132, 0.738242],
      ["11%1", 0.509541, 0.519066],
      ["11%5", 0.56821, 0.390063],
      ["11%3", 0.813254, 0.594844],
      ["110%1", 0.258226, 0.729942],
      ["110%2", 0.906667, 0.460923],
      ["111%1", 0.275879, 0.742278],
      ["111%2", 0.911638, 0.427649],
      ["112%1", 0.274399, 0.732957],
      ["113%1", 0.276576, 0.729614],
      ["114%1", 0.259869, 0.71961],
      ["114%2", 0.796705, 0.466043],
      ["115%1", 0.276641, 0.723159],
      ["115%2", 0.776125, 0.490137],
      ["116%1", 0.267759, 0.708141],
      ["117%1", 0.270847, 0.703362],
      ["118%1", 0.276897, 0.716303],
      ["119%1", 0.281767, 0.704433],
      ["119%2", 0.834961, 0.45946],
      ["12%2", 0.179833, 0.762002],
      ["12%1", 0.496863, 0.491574],
      ["12%5", 0.781711, 0.47535],
      ["12%3", 0.825594, 0.591247],
      ["120%2", 0.714748, 0.525357],
      ["121%1", 0.410158, 0.470976],
      ["121%2", 0.825135, 0.43696],
      ["122%1", 0.591339, 0.489088],
      ["122%2", 0.825023, 0.512293],
      ["123%1", 0.397153, 0.60334],
      ["123%2", 0.911627, 0.576241],
      ["125%1", 0.581604, 0.486575],
      ["125%2", 0.849825, 0.49404],
      ["126%1", 0.376635, 0.621445],
      ["127%1", 0.672233, 0.289869],
      ["128%1", 0.663623, 0.285733],
      ["129%1", 0.668298, 0.284505],
      ["13%2", 0.170724, 0.799867],
      ["13%5", 0.417409, 0.599914],
      ["13%1", 0.497034, 0.487224],
      ["13%3", 0.798216, 0.579697],
      ["130%1", 0.668174, 0.279897],
      ["131%1", 0.663876, 0.28014],
      ["132%1", 0.66822, 0.290983],
      ["133%1", 0.672093, 0.292006],
      ["134%1", 0.661674, 0.290913],
      ["135%1", 0.520861, 0.569233],
      ["137%1", 0.613963, 0.331583],
      ["138%1", 0.371203, 0.615676],
      ["14%2", 0.231099, 0.853037],
      ["14%5", 0.325578, 0.358971],
      ["14%3", 0.795636, 0.496842],
      ["140%1", 0.41015, 0.491028],
      ["141%1", 0.186782, 0.847215],
      ["142%1", 0.396579, 0.592437],
      ["143%1", 0.424057, 0.561132],
      ["144%1", 0.611145, 0.344668],
      ["145%1", 0.11271, 0.834229],
      ["147%1", 0.470346, 0.576563],
      ["148%1", 0.486876, 0.54939],
      ["149%1", 0.469667, 0.553611],
      ["15%2", 0.373528, 0.572866],
      ["150%1", 0.537603, 0.43175],
      ["151%1", 0.431416, 0.424601],
      ["152%1", 0.565393, 0.603074],
      ["153%1", 0.672453, 0.38867],
      ["154%1", 0.669717, 0.373299],
      ["155%1", 0.669381, 0.353705],
      ["156%1", 0.669306, 0.339751],
      ["157%1", 0.673665, 0.343839],
      ["16%2", 0.363302, 0.673166],
      ["16%5", 0.813333, 0.873943],
      ["162%1", 0.676799, 0.34415],
      ["166%1", 0.588743, 0.328037],
      ["167%2", 0.325189, 0.193892],
      ["167%1", 0.619776, 0.427553],
      ["168%2", 0.392316, 0.229071],
      ["168%1", 0.603868, 0.428232],
      ["169%2", 0.410397, 0.218273],
      ["169%1", 0.477464, 0.490775],
      ["17%2", 0.388359, 0.635392],
      ["17%3", 0.397655, 0.546291],
      ["17%5", 0.409496, 0.384335],
      ["170%2", 0.389601, 0.120035],
      ["171%1", 0.49603, 0.513764],
      ["172%1", 0.854174, 0.636854],
      ["173%1", 0.447764, 0.604697],
      ["174%2", 0.155854, 0.732969],
      ["174%1", 0.38118, 0.612977],
      ["175%2", 0.161078, 0.726127],
      ["175%1", 0.509582, 0.471734],
      ["176%2", 0.428714, 0.541627],
      ["176%1", 0.508547, 0.476935],
      ["177%2", 0.345409, 0.195064],
      ["177%1", 0.506019, 0.478583],
      ["178%1", 0.507917, 0.481405],
      ["179%1", 0.502591, 0.486196],
      ["18%2", 0.388736, 0.687941],
      ["18%1", 0.527947, 0.506042],
      ["180%1", 0.502779, 0.48198],
      ["181%1", 0.499355, 0.483121],
      ["182%1", 0.502361, 0.474934],
      ["183%1", 0.497075, 0.478332],
      ["184%2", 0.142449, 0.786291],
      ["184%1", 0.448605, 0.653237],
      ["185%2", 0.481982, 0.5868],
      ["186%1", 0.455428, 0.425023],
      ["188%1", 0.552849, 0.523816],
      ["19%5", 0.408537, 0.694179],
      ["19%2", 0.451332, 0.648565],
      ["19%1", 0.533098, 0.509295],
      ["190%1", 0.177775, 0.810247],
      ["192%1", 0.16315, 0.809563],
      ["193%1", 0.428696, 0.683501],
      ["195%1", 0.389478, 0.614304],
      ["196%1", 0.541604, 0.396814],
      ["197%1", 0.590531, 0.403834],
      ["198%1", 0.812721, 0.624561],
      ["199%1", 0.821293, 0.624063],
      ["2%2", 0.105039, 0.913625],
      ["2%4", 0.182734, 0.717024],
      ["2%7", 0.369589, 0.718986],
      ["20%2", 0.429023, 0.627185],
      ["20%1", 0.542688, 0.501439],
      ["20%5", 0.616497, 0.485106],
      ["200%1", 0.809352, 0.630384],
      ["201%1", 0.821379, 0.631564],
      ["209%1", 0.679569, 0.322027],
      ["21%2", 0.439978, 0.602269],
      ["21%1", 0.540441, 0.515482],
      ["216%1", 0.589502, 0.517361],
      ["217%1", 0.594947, 0.516489],
      ["218%1", 0.145177, 0.815414],
      ["219%1", 0.423369, 0.380507],
      ["22%2", 0.444553, 0.583466],
      ["22%5", 0.509687, 0.471727],
      ["23%2", 0.43084, 0.546028],
      ["23%5", 0.523917, 0.593715],
      ["238%1", 0.600898, 0.49266],
      ["24%2", 0.438925, 0.543039],
      ["24%5", 0.780531, 0.396903],
      ["240%1", 0.120727, 0.861207],
      ["243%1", 0.447521, 0.465825],
      ["245%1", 0.407408, 0.668838],
      ["246%1", 0.596699, 0.310763],
      ["249%1", 0.394108, 0.621999],
      ["25%2", 0.365321, 0.59602],
      ["250%1", 0.410826, 0.624299],
      ["251%1", 0.490346, 0.413647],
      ["252%1", 0.576857, 0.581103],
      ["253%1", 0.205978, 0.795163],
      ["254%1", 0.197061, 0.802546],
      ["255%1", 0.559927, 0.611211],
      ["256%1", 0.404463, 0.527291],
      ["257%1", 0.395949, 0.479812],
      ["258%1", 0.610007, 0.304034],
      ["259%1", 0.563281, 0.449564],
      ["26%1", 0.397084, 0.040551],
      ["26%2", 0.401825, 0.513561],
      ["261%1", 0.125823, 0.807681],
      ["262%1", 0.152833, 0.761889],
      ["263%1", 0.138203, 0.779455],
      ["264%1", 0.149765, 0.778835],
      ["265%1", 0.14817, 0.792556],
      ["266%1", 0.152486, 0.793788],
      ["267%1", 0.154493, 0.778173],
      ["269%1", 0.567313, 0.579173],
      ["27%2", 0.356916, 0.496219],
      ["27%5", 0.679607, 0.312519],
      ["270%1", 0.565581, 0.590487],
      ["271%1", 0.413283, 0.291349],
      ["272%1", 0.405341, 0.298239],
      ["273%1", 0.407344, 0.279057],
      ["274%1", 0.412418, 0.305692],
      ["275%1", 0.415213, 0.318877],
      ["276%1", 0.41192, 0.327762],
      ["277%1", 0.173545, 0.817935],
      ["279%1", 0.149784, 0.736538],
      ["28%2", 0.357459, 0.457053],
      ["281%1", 0.778199, 0.877696],
      ["282%1", 0.773359, 0.886964],
      ["283%1", 0.780436, 0.886767],
      ["284%1", 0.786525, 0.886716],
      ["285%1", 0.782233, 0.866726],
      ["286%1", 0.783908, 0.860155],
      ["287%1", 0.789057, 0.866593],
      ["288%1", 0.791495, 0.861565],
      ["289%1", 0.798245, 0.861751],
      ["29%5", 0.208512, 0.793787],
      ["29%2", 0.377165, 0.464095],
      ["290%1", 0.795905, 0.866486],
      ["291%1", 0.804495, 0.861076],
      ["292%1", 0.799665, 0.875056],
      ["293%1", 0.803622, 0.877075],
      ["294%1", 0.799966, 0.885928],
      ["295%1", 0.793693, 0.88578],
      ["296%1", 0.83437, 0.896273],
      ["297%1", 0.828477, 0.893697],
      ["298%1", 0.831438, 0.885171],
      ["299%1", 0.826346, 0.873725],
      ["3%2", 0.116045, 0.907571],
      ["3%4", 0.357034, 0.758152],
      ["3%7", 0.388359, 0.635392],
      ["30%2", 0.391008, 0.456489],
      ["300%1", 0.83596, 0.879361],
      ["301%1", 0.824974, 0.881662],
      ["302%1", 0.824221, 0.890201],
      ["303%1", 0.818739, 0.887562],
      ["304%1", 0.818857, 0.879566],
      ["305%1", 0.819704, 0.872285],
      ["306%1", 0.81447, 0.871029],
      ["307%1", 0.810798, 0.87785],
      ["308%1", 0.808504, 0.885731],
      ["309%1", 0.849414, 0.876637],
      ["31%2", 0.433083, 0.466527],
      ["310%1", 0.85045, 0.871544],
      ["311%1", 0.853912, 0.866582],
      ["312%1", 0.858382, 0.862492],
      ["313%1", 0.855257, 0.86067],
      ["314%1", 0.840498, 0.871782],
      ["315%1", 0.834345, 0.869396],
      ["316%1", 0.845449, 0.862631],
      ["317%1", 0.840694, 0.860728],
      ["318%1", 0.825248, 0.860731],
      ["319%1", 0.831219, 0.86206],
      ["320%1", 0.81858, 0.86027],
      ["321%1", 0.810954, 0.860342],
      ["327%1", 0.604599, 0.497908],
      ["328%1", 0.100538, 0.889956],
      ["329%1", 0.575461, 0.422994],
      ["33%5", 0.232437, 0.522846],
      ["338%1", 0.537615, 0.554134],
      ["339%1", 0.402682, 0.702338],
      ["340%1", 0.448363, 0.505345],
      ["341%1", 0.461856, 0.379561],
      ["342%1", 0.456414, 0.368253],
      ["343%1", 0.410906, 0.402851],
      ["344%1", 0.375118, 0.351566],
      ["345%1", 0.425752, 0.359392],
      ["346%1", 0.415908, 0.342329],
      ["347%1", 0.652039, 0.480817],
      ["348%1", 0.431341, 0.578277],
      ["349%1", 0.390167, 0.469505],
      ["35%2", 0.39298, 0.406057],
      ["36%2", 0.372284, 0.399131],
      ["37%2", 0.374063, 0.370228],
      ["38%2", 0.398338, 0.28818],
      ["39%2", 0.433765, 0.37508],
      ["391%1", 0.428389, 0.396895],
      ["393%1", 0.390595, 0.624258],
      ["394%1", 0.606913, 0.506338],
      ["396%1", 0.448703, 0.406938],
      ["397%1", 0.359884, 0.489931],
      ["398%1", 0.376647, 0.477469],
      ["4%2", 0.120089, 0.864053],
      ["4%7", 0.182734, 0.717024],
      ["4%5", 0.846471, 0.618626],
      ["4%4", 0.8687782713440937, 0.5269409367280795],
      ["40%2", 0.466522, 0.377672],
      ["400%1", 0.445393, 0.402759],
      ["401%1", 0.424993, 0.250162],
      ["403%1", 0.392011, 0.527074],
      ["405%1", 0.105993, 0.87116],
      ["406%1", 0.178181, 0.769075],
      ["41%2", 0.4054, 0.348942],
      ["410%1", 0.612008, 0.513368],
      ["411%1", 0.420635, 0.189806],
      ["412%1", 0.177322, 0.814003],
      ["415%1", 0.603464, 0.519065],
      ["416%1", 0.135333, 0.848805],
      ["417%1", 0.109701, 0.873624],
      ["420%1", 0.385672, 0.562452],
      ["421%1", 0.660078, 0.509117],
      ["422%1", 0.783682, 0.50195],
      ["423%1", 0.429145, 0.446164],
      ["424%1", 0.108853, 0.845702],
      ["425%1", 0.38007, 0.599899],
      ["427%1", 0.545688, 0.450208],
      ["428%1", 0.549827, 0.42809],
      ["429%1", 0.546668, 0.431302],
      ["430%1", 0.51352, 0.455222],
      ["431%1", 0.4505, 0.290212],
      ["432%1", 0.813989, 0.47],
      ["433%1", 0.407614, 0.536975],
      ["434%1", 0.433855, 0.641975],
      ["435%1", 0.12014, 0.866506],
      ["436%1", 0.133427, 0.865845],
      ["440%1", 0.431014, 0.319103],
      ["441%1", 0.433742, 0.304752],
      ["442%1", 0.551061, 0.453419],
      ["443%1", 0.210281, 0.780375],
      ["446%1", 0.223737, 0.861647],
      ["447%1", 0.572532, 0.591659],
      ["448%1", 0.425029, 0.333079],
      ["449%1", 0.154168, 0.704319],
      ["450%1", 0.115805, 0.850549],
      ["455%1", 0.415584, 0.378925],
      ["456%1", 0.82019, 0.461348],
      ["460%1", 0.445638, 0.414222],
      ["461%1", 0.890385, 0.670101],
      ["462%1", 0.426591, 0.160143],
      ["464%1", 0.571298, 0.565679],
      ["465%1", 0.606995, 0.317967],
      ["467%1", 0.431781, 0.523652],
      ["468%1", 0.443925, 0.530234],
      ["469%1", 0.437594, 0.519362],
      ["470%1", 0.457771, 0.524955],
      ["471%1", 0.479805, 0.46414],
      ["472%1", 0.13767, 0.8828],
      ["473%1", 0.126303, 0.891225],
      ["476%1", 0.143613, 0.754426],
      ["477%1", 0.136962, 0.757679],
      ["479%1", 0.137614, 0.751141],
      ["480%1", 0.140818, 0.745917],
      ["482%1", 0.117496, 0.829492],
      ["483%1", 0.118923, 0.824848],
      ["484%1", 0.128745, 0.828326],
      ["485%1", 0.122963, 0.839316],
      ["487%1", 0.217555, 0.896218],
      ["488%1", 0.216226, 0.869334],
      ["49%2", 0.429088, 0.168432],
      ["493%1", 0.381673, 0.123289],
      ["494%1", 0.380767, 0.106589],
      ["495%1", 0.375642, 0.132755],
      ["496%1", 0.368592, 0.460047],
      ["497%1", 0.405086, 0.711384],
      ["498%1", 0.759267, 0.503153],
      ["499%1", 0.357336, 0.472814],
      ["5%2", 0.14254, 0.867178],
      ["5%5", 0.40305, 0.486333],
      ["50%2", 0.383242, 0.210951],
      ["501%1", 0.358056, 0.396687],
      ["502%1", 0.354251, 0.386606],
      ["503%1", 0.364458, 0.392594],
      ["504%1", 0.359214, 0.378356],
      ["505%1", 0.363317, 0.382508],
      ["506%1", 0.359536, 0.387208],
      ["507%1", 0.35459, 0.375529],
      ["508%1", 0.359368, 0.364697],
      ["509%1", 0.358346, 0.370006],
      ["51%2", 0.448635, 0.304398],
      ["510%1", 0.364696, 0.369791],
      ["511%1", 0.36536, 0.363803],
      ["512%1", 0.354455, 0.367553],
      ["513%1", 0.374733, 0.377773],
      ["514%1", 0.372336, 0.378882],
      ["516%1", 0.403945, 0.576179],
      ["517%1", 0.411562, 0.580877],
      ["518%1", 0.609235, 0.569855],
      ["52%2", 0.416484, 0.194524],
      ["520%1", 0.563995, 0.462717],
      ["521%1", 0.570852, 0.469749],
      ["522%1", 0.567421, 0.481042],
      ["523%1", 0.577922, 0.477164],
      ["524%1", 0.574609, 0.464082],
      ["525%1", 0.581434, 0.469899],
      ["526%1", 0.561525, 0.422904],
      ["527%1", 0.588056, 0.373853],
      ["529%1", 0.433287, 0.60222],
      ["53%2", 0.417488, 0.163226],
      ["530%1", 0.185317, 0.747659],
      ["531%1", 0.187134, 0.740939],
      ["532%1", 0.193346, 0.748107],
      ["533%1", 0.617492, 0.513524],
      ["534%1", 0.174683, 0.758603],
      ["535%1", 0.58694, 0.506847],
      ["536%1", 0.853204, 0.363778],
      ["537%1", 0.851005, 0.370322],
      ["538%1", 0.846915, 0.375527],
      ["539%1", 0.842512, 0.379975],
      ["540%1", 0.836924, 0.383169],
      ["541%1", 0.837494, 0.362849],
      ["544%1", 0.450614, 0.403676],
      ["545%1", 0.450372, 0.398639],
      ["546%1", 0.451221, 0.397296],
      ["548%1", 0.887259, 0.443432],
      ["555%1", 0.578036, 0.517611],
      ["556%1", 0.675545, 0.368039],
      ["557%1", 0.600956, 0.412717],
      ["56%1", 0.527224, 0.49467],
      ["563%1", 0.375592, 0.457828],
      ["564%1", 0.562851, 0.611804],
      ["57%1", 0.524202, 0.495764],
      ["573%1", 0.520339, 0.588384],
      ["574%1", 0.686914, 0.340203],
      ["575%1", 0.675742, 0.357514],
      ["578%1", 0.55514, 0.624482],
      ["579%1", 0.365232, 0.321579],
      ["580%1", 0.561376, 0.616824],
      ["581%1", 0.552117, 0.631224],
      ["583%1", 0.3534, 0.400087],
      ["584%1", 0.362067, 0.403776],
      ["585%1", 0.357668, 0.402918],
      ["590%1", 0.672506, 0.314866],
      ["593%1", 0.562548, 0.399994],
      ["594%1", 0.368871, 0.586016],
      ["595%1", 0.414148, 0.296723],
      ["596%1", 0.558847, 0.62265],
      ["597%1", 0.51201, 0.541549],
      ["598%1", 0.547541, 0.631209],
      ["599%1", 0.546755, 0.63668],
      ["6%2", 0.138368, 0.842945],
      ["6%5", 0.414484, 0.217313],
      ["6%3", 0.824539, 0.575728],
      ["600%1", 0.552049, 0.636922],
      ["601%1", 0.398167, 0.265289],
      ["602%1", 0.404061, 0.272376],
      ["603%1", 0.392782, 0.280258],
      ["604%1", 0.385659, 0.280861],
      ["605%1", 0.39415, 0.289733],
      ["606%1", 0.393238, 0.297812],
      ["607%1", 0.385464, 0.29751],
      ["608%1", 0.394085, 0.30792],
      ["609%1", 0.385965, 0.307732],
      ["610%1", 0.395488, 0.317947],
      ["611%1", 0.386203, 0.316229],
      ["612%1", 0.387197, 0.323437],
      ["613%1", 0.38781, 0.329669],
      ["614%1", 0.384882, 0.26099],
      ["615%1", 0.392679, 0.262748],
      ["616%1", 0.372754, 0.264495],
      ["617%1", 0.35689, 0.26475],
      ["618%1", 0.356495, 0.275119],
      ["619%1", 0.35659, 0.285338],
      ["62%2", 0.364163, 0.15746],
      ["620%1", 0.358141, 0.296012],
      ["621%1", 0.356798, 0.305879],
      ["622%1", 0.368159, 0.307874],
      ["623%1", 0.371351, 0.275542],
      ["624%1", 0.377138, 0.281287],
      ["625%1", 0.377006, 0.302079],
      ["628%1", 0.831462, 0.473253],
      ["629%1", 0.827666, 0.504341],
      ["636%1", 0.574903, 0.488856],
      ["637%1", 0.365698, 0.374273],
      ["638%1", 0.621391, 0.463636],
      ["640%1", 0.530146, 0.615905],
      ["641%1", 0.546831, 0.369883],
      ["643%1", 0.577269, 0.396125],
      ["645%1", 0.42121, 0.699975],
      ["646%1", 0.412556, 0.680669],
      ["647%1", 0.84922, 0.440553],
      ["649%1", 0.424075, 0.518928],
      ["650%1", 0.439749, 0.514416],
      ["651%1", 0.477393, 0.452449],
      ["652%1", 0.377669, 0.34009],
      ["653%1", 0.374017, 0.340273],
      ["654%1", 0.368741, 0.339618],
      ["655%1", 0.363661, 0.339599],
      ["656%1", 0.358443, 0.341544],
      ["657%1", 0.354901, 0.341375],
      ["658%1", 0.354697, 0.35426],
      ["659%1", 0.35851, 0.355031],
      ["660%1", 0.363675, 0.355996],
      ["661%1", 0.445497, 0.383841],
      ["662%1", 0.448272, 0.372485],
      ["663%1", 0.443174, 0.354057],
      ["664%1", 0.448594, 0.351029],
      ["665%1", 0.458009, 0.354786],
      ["666%1", 0.45468, 0.388912],
      ["667%1", 0.415833, 0.349287],
      ["668%1", 0.409222, 0.361145],
      ["669%1", 0.393856, 0.355634],
      ["67%2", 0.672475, 0.458863],
      ["670%1", 0.393856, 0.346433],
      ["671%1", 0.399282, 0.342152],
      ["672%1", 0.359967, 0.479013],
      ["673%1", 0.355536, 0.482716],
      ["674%1", 0.356032, 0.488816],
      ["675%1", 0.359589, 0.485196],
      ["676%1", 0.365141, 0.488317],
      ["677%1", 0.361919, 0.492539],
      ["678%1", 0.367467, 0.492595],
      ["679%1", 0.37076, 0.488143],
      ["68%2", 0.650042, 0.487617],
      ["680%1", 0.535387, 0.485291],
      ["681%1", 0.59808, 0.391388],
      ["682%1", 0.596463, 0.362508],
      ["683%1", 0.595676, 0.349687],
      ["684%1", 0.572966, 0.358485],
      ["685%1", 0.464493, 0.634476],
      ["687%1", 0.36535, 0.388931],
      ["688%1", 0.50266, 0.585583],
      ["69%2", 0.588936, 0.471346],
      ["695%1", 0.899581, 0.687359],
      ["696%1", 0.913434, 0.677967],
      ["697%1", 0.910353, 0.667445],
      ["698%1", 0.897706, 0.67333],
      ["699%1", 0.889792, 0.686422],
      ["7%2", 0.126019, 0.816917],
      ["7%3", 0.838746, 0.573378],
      ["70%2", 0.556614, 0.48089],
      ["700%1", 0.888112, 0.676868],
      ["701%1", 0.87043, 0.687168],
      ["702%1", 0.872958, 0.670481],
      ["703%1", 0.863218, 0.685035],
      ["704%1", 0.863132, 0.672877],
      ["705%1", 0.842441, 0.686787],
      ["706%1", 0.849899, 0.671504],
      ["707%1", 0.837271, 0.67459],
      ["708%1", 0.833285, 0.680852],
      ["709%1", 0.823157, 0.677613],
      ["71%2", 0.637881, 0.541766],
      ["710%1", 0.807214, 0.67961],
      ["711%1", 0.808455, 0.672718],
      ["712%1", 0.793497, 0.679766],
      ["713%1", 0.790353, 0.663386],
      ["714%1", 0.783334, 0.66427],
      ["715%1", 0.784397, 0.674287],
      ["716%1", 0.774901, 0.664596],
      ["717%1", 0.821292, 0.658254],
      ["718%1", 0.822117, 0.646677],
      ["719%1", 0.826387, 0.65336],
      ["72%2", 0.561093, 0.514097],
      ["720%1", 0.83448, 0.653898],
      ["721%1", 0.845569, 0.652518],
      ["722%1", 0.850908, 0.643737],
      ["723%1", 0.845544, 0.628396],
      ["724%1", 0.852593, 0.619303],
      ["725%1", 0.860424, 0.622198],
      ["726%1", 0.868868, 0.626599],
      ["727%1", 0.86535, 0.634476],
      ["728%1", 0.876489, 0.634215],
      ["729%1", 0.864721, 0.642601],
      ["73%2", 0.529609, 0.51926],
      ["73%1", 0.553859, 0.47361],
      ["730%1", 0.861574, 0.650998],
      ["731%1", 0.875077, 0.649178],
      ["732%1", 0.884602, 0.649573],
      ["733%1", 0.883622, 0.637499],
      ["734%1", 0.897937, 0.639403],
      ["735%1", 0.895064, 0.647143],
      ["736%1", 0.906104, 0.646569],
      ["737%1", 0.905894, 0.63749],
      ["738%1", 0.913799, 0.643823],
      ["739%1", 0.629487, 0.476042],
      ["74%2", 0.563582, 0.521955],
      ["740%1", 0.643031, 0.481939],
      ["741%1", 0.661049, 0.489685],
      ["742%1", 0.640726, 0.496301],
      ["743%1", 0.634964, 0.49353],
      ["744%1", 0.625927, 0.48423],
      ["746%1", 0.641216, 0.470399],
      ["747%1", 0.675568, 0.474871],
      ["748%1", 0.665078, 0.468617],
      ["749%1", 0.670338, 0.483645],
      ["75%2", 0.52089, 0.511304],
      ["750%1", 0.666455, 0.478723],
      ["751%1", 0.672504, 0.488282],
      ["752%1", 0.67094, 0.493035],
      ["753%1", 0.669129, 0.497518],
      ["754%1", 0.668496, 0.505052],
      ["755%1", 0.662704, 0.497307],
      ["756%1", 0.658339, 0.502124],
      ["757%1", 0.66609, 0.510356],
      ["758%1", 0.656396, 0.514779],
      ["759%1", 0.646766, 0.50189],
      ["76%2", 0.509877, 0.489247],
      ["760%1", 0.64534, 0.506618],
      ["761%1", 0.651267, 0.518614],
      ["762%1", 0.645175, 0.523594],
      ["763%1", 0.658469, 0.527988],
      ["764%1", 0.660865, 0.519415],
      ["765%1", 0.675201, 0.480799],
      ["766%1", 0.650829, 0.51064],
      ["767%1", 0.637425, 0.501963],
      ["768%1", 0.385244, 0.463714],
      ["769%1", 0.617476, 0.417351],
      ["77%2", 0.500083, 0.515023],
      ["771%1", 0.440643, 0.457672],
      ["772%1", 0.453864, 0.328255],
      ["773%1", 0.414462, 0.253581],
      ["775%1", 0.612402, 0.403276],
      ["78%2", 0.435945, 0.49708],
      ["781%1", 0.749664, 0.632434],
      ["782%1", 0.720039, 0.630274],
      ["783%1", 0.733863, 0.621297],
      ["784%1", 0.748284, 0.611682],
      ["785%1", 0.754236, 0.625268],
      ["786%1", 0.764622, 0.631552],
      ["787%1", 0.52241, 0.622074],
      ["79%2", 0.469249, 0.46158],
      ["795%1", 0.525867, 0.452557],
      ["797%1", 0.807304, 0.639947],
      ["798%1", 0.806228, 0.64616],
      ["799%1", 0.813974, 0.640469],
      ["8%2", 0.13324, 0.816529],
      ["8%3", 0.837443, 0.598373],
      ["80%2", 0.475396, 0.505422],
      ["801%1", 0.49814, 0.46686],
      ["802%1", 0.3749, 0.380086],
      ["804%1", 0.439238, 0.581389],
      ["806%1", 0.455748, 0.316978],
      ["81%2", 0.537776, 0.437356],
      ["812%1", 0.20069, 0.855057],
      ["815%1", 0.28129, 0.729816],
      ["816%1", 0.827961, 0.463994],
      ["817%1", 0.811765, 0.466809],
      ["820%1", 0.553239, 0.501662],
      ["822%1", 0.428257, 0.523167],
      ["823%1", 0.435796, 0.523632],
      ["824%1", 0.437203, 0.530645],
      ["825%1", 0.105378, 0.905852],
      ["826%1", 0.109811, 0.891154],
      ["827%1", 0.105378, 0.898614],
      ["828%1", 0.108129, 0.905149],
      ["830%1", 0.366884, 0.601167],
      ["832%1", 0.42435, 0.277931],
      ["833%1", 0.385793, 0.192148],
      ["834%1", 0.379104, 0.208832],
      ["835%1", 0.376222, 0.224688],
      ["836%1", 0.367318, 0.223443],
      ["837%1", 0.361794, 0.220837],
      ["838%1", 0.365334, 0.206783],
      ["839%1", 0.371905, 0.20603],
      ["840%1", 0.373313, 0.186699],
      ["842%1", 0.870015, 0.477559],
      ["843%1", 0.733597, 0.460857],
      ["844%1", 0.764844, 0.54059],
      ["848%1", 0.553143, 0.586909],
      ["851%1", 0.720476, 0.547192],
      ["853%1", 0.549711, 0.654188],
      ["854%1", 0.752485, 0.479232],
      ["856%1", 0.355769, 0.247926],
      ["857%1", 0.546587, 0.638802],
      ["862%1", 0.407038, 0.190632],
      ["863%1", 0.407549, 0.19641],
      ["864%1", 0.403853, 0.202176],
      ["865%1", 0.40275, 0.211432],
      ["866%1", 0.399141, 0.222143],
      ["867%1", 0.388368, 0.220416],
      ["868%1", 0.390209, 0.209926],
      ["869%1", 0.85777, 0.432398],
      ["870%1", 0.879497, 0.464145],
      ["871%1", 0.866259, 0.463601],
      ["872%1", 0.363384, 0.609454],
      ["873%1", 0.360097, 0.62018],
      ["874%1", 0.368535, 0.626431],
      ["875%1", 0.546469, 0.435123],
      ["876%1", 0.553015, 0.435498],
      ["877%1", 0.37624, 0.490886],
      ["878%1", 0.381979, 0.49402],
      ["879%1", 0.839169, 0.349893],
      ["88%2", 0.495636, 0.396627],
      ["880%1", 0.844774, 0.349181],
      ["881%1", 0.846942, 0.350673],
      ["883%1", 0.600776, 0.447756],
      ["89%2", 0.552109, 0.334884],
      ["892%1", 0.755852, 0.452378],
      ["893%1", 0.345276, 0.170252],
      ["897%1", 0.77467, 0.442631],
      ["9%2", 0.138195, 0.767401],
      ["9%5", 0.301578, 0.161725],
      ["9%3", 0.818698, 0.610053],
      ["90%2", 0.529786, 0.3744],
      ["900%1", 0.40646, 0.238667],
      ["901%1", 0.160831, 0.733497],
      ["902%1", 0.519452, 0.632719],
      ["903%1", 0.546266, 0.604757],
      ["904%1", 0.211493, 0.877201],
      ["905%1", 0.217946, 0.864511],
      ["906%1", 0.222803, 0.883264],
      ["91%2", 0.611804, 0.371925],
      ["91%1", 0.65996, 0.390142],
      ["915%1", 0.106667, 0.880261],
      ["918%1", 0.797266, 0.494931],
      ["919%1", 0.794442, 0.44074],
      ["92%2", 0.544429, 0.432795],
      ["922%1", 0.879315, 0.473337],
      ["925%1", 0.743507, 0.418037],
      ["926%1", 0.765383, 0.406505],
      ["93%2", 0.612006, 0.412232],
      ["931%1", 0.426364, 0.143217],
      ["932%1", 0.848849, 0.430406],
      ["934%1", 0.742382, 0.504428],
      ["935%1", 0.857351, 0.465432],
      ["939%1", 0.397811, 0.102921],
      ["94%2", 0.68793, 0.35124],
      ["940%1", 0.377962, 0.08793],
      ["941%1", 0.374618, 0.036866],
      ["942%1", 0.399409, 0.084425],
      ["944%1", 0.727182, 0.499159],
      ["945%1", 0.651444, 0.475143],
      ["95%2", 0.582132, 0.434873],
      ["96%2", 0.597922, 0.419869],
      ["968%1", 0.828596, 0.556918],
      ["97%2", 0.66486, 0.403843],
      ["975%1", 0.552109, 0.334884],
      ["978%1", 0.609794945913091, 0.46526746238875993],
      ["979%1", 0.393267, 0.546647],
      ["98%2", 0.525045, 0.537534],
      ["981%1", 0.776695, 0.521381],
      ["982%1", 0.839938, 0.573708],
      ["983%1", 0.805242, 0.579058],
      ["984%1", 0.829708, 0.589068],
      ["985%1", 0.799429, 0.594692],
      ["986%1", 0.823416, 0.600176],
      ["987%1", 0.84362, 0.589515],
      ["99%2", 0.555162, 0.541264],
    ],
    "",
    "0",
    1,
  );
};

window.onload = function () {
  init(
    0,
    "open",
    "closed",
    "open",
    2,
    256,
    "/tdb/Mapping/MCUCSD/",
    "MCUCSD",
    5,
    true,
    0,
    { x: ".5", y: ".5" },
    ".png",
    [
      [0, "Base", 293, 317],
      [0, "Buildings", 293, 317],
      [0, "Landscape", 293, 317],
      [0, "Real-Estate", 293, 317],
      [0, "Topo", 293, 317],
      [0, "Utilities", 293, 317],
      [1, "Topo", 586, 633],
      [1, "Utilities", 586, 633],
      [1, "Base", 586, 633],
      [1, "Landscape", 586, 633],
      [1, "Real-Estate", 586, 633],
      [1, "Buildings", 586, 633],
      [2, "Real-Estate", 1172, 1266],
      [2, "Topo", 1172, 1266],
      [2, "Base", 1172, 1266],
      [2, "Landscape", 1172, 1266],
      [2, "Buildings", 1172, 1266],
      [2, "Utilities", 1172, 1266],
      [3, "Real-Estate", 2344, 2532],
      [3, "Buildings", 2344, 2532],
      [3, "Landscape", 2344, 2532],
      [3, "Utilities", 2344, 2532],
      [3, "Topo", 2344, 2532],
      [3, "Base", 2344, 2532],
      [4, "Topo", 4688, 5063],
      [4, "Landscape", 4688, 5063],
      [4, "Buildings", 4688, 5063],
      [4, "Utilities", 4688, 5063],
      [4, "Real-Estate", 4688, 5063],
      [4, "Base", 4688, 5063],
    ],
    [],
    [
      [
        "MCAerial2012",
        "16",
        1,
        -0.361025363120134,
        -0.318296889678873,
        "/tdb/Mapping/MCUCSD/MCAerial2012/Keymap.png",
        620,
        620,
        "/tdb/Mapping/MCUCSD/MCAerial2012/Keymap.png",
        250,
        250,
        "2013010810150699617708",
      ],
      [
        "MCAerial1999",
        "3",
        0,
        0.1515,
        0.0731,
        "/tdb/Mapping/MCUCSD/MCAerial1999/Keymap.png",
        129,
        133,
        "/tdb/Mapping/MCUCSD/MCAerial1999/Keymap.png",
        242,
        250,
        "2012041211273981563607",
      ],
      [
        "MCAerial2010",
        "5",
        0,
        -0.0805,
        -0.16985,
        "/tdb/Mapping/MCUCSD/MCAerial2010/Keymap.png",
        163,
        151,
        "/tdb/Mapping/MCUCSD/MCAerial2010/Keymap.png",
        250,
        232,
        "2012041211273981563607",
      ],
      [
        "MCParking",
        "6",
        0,
        0.2453,
        0.2315,
        "/tdb/Mapping/MCUCSD/MCParking/Keymap.png",
        127,
        155,
        "/tdb/Mapping/MCUCSD/MCParking/Keymap.png",
        250,
        305,
        "2016011412535057211908",
      ],
    ],
    [
      [3, 0, 265, 257],
      [3, 1, 530, 514],
      [3, 2, 1060, 1028],
      [3, 3, 2120, 2055],
      [3, 4, 4240, 4110],
      [5, 0, 604, 652],
      [5, 1, 1209, 1304],
      [5, 2, 2418, 2607],
      [5, 3, 4835, 5214],
      [5, 4, 9670, 10428],
      [16, 0, 1240, 1240],
      [16, 1, 2479, 2479],
      [16, 2, 4959, 4959],
      [16, 3, 9918, 9918],
      [16, 4, 19835, 19835],
      [6, 0, 309, 254],
      [6, 1, 619, 508],
      [6, 2, 1238, 1016],
      [6, 3, 2475, 2032],
      [6, 4, 4950, 4064],
    ],
    [],
    [],
    2531.25,
    2343.65625,
    [
      ["136%1", 0.792849, 0.712059],
      ["153%2", 0.401682, 0.628597],
      ["154%2", 0.256914, 0.544426],
      ["155%2", 0.282977, 0.468244],
      ["156%2", 0.471499, 0.416781],
      ["157%2", 0.518659, 0.325327],
      ["158%2", 0.604939, 0.503651],
      ["159%2", 0.672698, 0.530332],
      ["160%2", 0.851613, 0.666015],
      ["161%2", 0.677087, 0.304204],
      ["165%1", 0.502802, 0.48587],
      ["173%2", 0.65213, 0.861927],
      ["179%2", 0.695704, 0.682355],
      ["260%1", 0.5112, 0.585577],
      ["3%7", 0.255984, 0.363611],
      ["3%1", 0.742605, 0.730421],
      ["336%1", 0.276621, 0.510268],
      ["352%1", 0.675578, 0.566121],
      ["354%1", 0.648447, 0.520856],
      ["355%1", 0.644152, 0.579071],
      ["358%1", 0.367606, 0.518392],
      ["363%1", 0.570932, 0.860761],
      ["366%1", 0.632933, 0.806561],
      ["369%1", 0.663976, 0.670299],
      ["370%1", 0.685867, 0.667276],
      ["374%1", 0.293939, 0.719079],
      ["375%1", 0.84692, 0.522461],
      ["376%1", 0.255984, 0.363611],
      ["377%1", 0.562748, 0.378866],
      ["379%1", 0.504799, 0.418046],
      ["380%1", 0.541859, 0.706399],
      ["381%1", 0.437664, 0.380254],
      ["382%1", 0.451639, 0.298612],
      ["383%1", 0.462345, 0.691696],
      ["384%1", 0.688189, 0.47424],
      ["386%1", 0.643865, 0.502938],
      ["387%1", 0.512798, 0.617288],
      ["389%1", 0.633529, 0.439449],
      ["390%1", 0.34684, 0.562772],
      ["399%1", 0.333058, 0.503613],
      ["402%1", 0.455777, 0.486082],
      ["774%1", 0.260481, 0.439823],
      ["818%1", 0.676741, 0.734538],
      ["819%1", 0.630375, 0.639888],
      ["852%1", 0.583321, 0.725625],
      ["882%1", 0.644002, 0.465375],
      ["887%1", 0.407695, 0.699077],
      ["888%1", 0.39793, 0.707232],
      ["889%1", 0.385661, 0.697304],
      ["890%1", 0.627586, 0.499775],
    ],
    "",
    "0",
    2,
  );
};
