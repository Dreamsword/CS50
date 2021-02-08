$("document").ready(function () {
    var e = {
        strings: ["Full Stack Developer.", "Web Developer.", "Front-end Developer.", "SQL Developer.", "Database Administrator", "Drupal Developer.", "Systems Administrator."],
        typeSpeed: 40,
        backSpeed: 50,
        backDelay: 2e3,
        loop: !0,
        loopCount: 1 / 0,
        shuffle: !0,
    };
    new Typed("#devText", e);
    $("#certModal").on("shown.bs.modal", function (e) {
        $("#certModal").trigger("resize");
    }),
        $(".certs").slick({ adaptiveHeight: !0, initialSlide: 0, centerMode: !0, dots: !0, infinite: !0, fade: !0, cssEase: "linear", lazyLoad: "progressive", slidesToShow: 1, prevArrow: $(".prev-arrow"), nextArrow: $(".next-arrow") });
}),
    $(document).ready(function () {
        AOS.init({ disable: "mobile" }),
            $("[data-bs-hover-animate]")
                .mouseenter(function () {
                    var e = $(this);
                    e.addClass("animated " + e.attr("data-bs-hover-animate"));
                })
                .mouseleave(function () {
                    var e = $(this);
                    e.removeClass("animated " + e.attr("data-bs-hover-animate"));
                });
    }),
    (function (e) {
        "use strict";
        "function" == typeof define && define.amd ? define(["jquery"], e) : "undefined" != typeof exports ? (module.exports = e(require("jquery"))) : e(jQuery);
    })(function (e) {
        "use strict";
        var t = window.Slick || {};
        (t = (function () {
            function t(t, s) {
                var o,
                    n = this;
                (n.defaults = {
                    accessibility: !0,
                    adaptiveHeight: !1,
                    appendArrows: e(t),
                    appendDots: e(t),
                    arrows: !0,
                    asNavFor: null,
                    prevArrow: '<button class="slick-prev" aria-label="Previous" type="button">Previous</button>',
                    nextArrow: '<button class="slick-next" aria-label="Next" type="button">Next</button>',
                    autoplay: !1,
                    autoplaySpeed: 3e3,
                    centerMode: !1,
                    centerPadding: "50px",
                    cssEase: "ease",
                    customPaging: function (t, i) {
                        return e('<button type="button" />').text(i + 1);
                    },
                    dots: !1,
                    dotsClass: "slick-dots",
                    draggable: !0,
                    easing: "linear",
                    edgeFriction: 0.35,
                    fade: !1,
                    focusOnSelect: !1,
                    focusOnChange: !1,
                    infinite: !0,
                    initialSlide: 0,
                    lazyLoad: "ondemand",
                    mobileFirst: !1,
                    pauseOnHover: !0,
                    pauseOnFocus: !0,
                    pauseOnDotsHover: !1,
                    respondTo: "window",
                    responsive: null,
                    rows: 1,
                    rtl: !1,
                    slide: "",
                    slidesPerRow: 1,
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    speed: 500,
                    swipe: !0,
                    swipeToSlide: !1,
                    touchMove: !0,
                    touchThreshold: 5,
                    useCSS: !0,
                    useTransform: !0,
                    variableWidth: !1,
                    vertical: !1,
                    verticalSwiping: !1,
                    waitForAnimate: !0,
                    zIndex: 1e3,
                }),
                    (n.initials = {
                        animating: !1,
                        dragging: !1,
                        autoPlayTimer: null,
                        currentDirection: 0,
                        currentLeft: null,
                        currentSlide: 0,
                        direction: 1,
                        $dots: null,
                        listWidth: null,
                        listHeight: null,
                        loadIndex: 0,
                        $nextArrow: null,
                        $prevArrow: null,
                        scrolling: !1,
                        slideCount: null,
                        slideWidth: null,
                        $slideTrack: null,
                        $slides: null,
                        sliding: !1,
                        slideOffset: 0,
                        swipeLeft: null,
                        swiping: !1,
                        $list: null,
                        touchObject: {},
                        transformsEnabled: !1,
                        unslicked: !1,
                    }),
                    e.extend(n, n.initials),
                    (n.activeBreakpoint = null),
                    (n.animType = null),
                    (n.animProp = null),
                    (n.breakpoints = []),
                    (n.breakpointSettings = []),
                    (n.cssTransitions = !1),
                    (n.focussed = !1),
                    (n.interrupted = !1),
                    (n.hidden = "hidden"),
                    (n.paused = !0),
                    (n.positionProp = null),
                    (n.respondTo = null),
                    (n.rowCount = 1),
                    (n.shouldClick = !0),
                    (n.$slider = e(t)),
                    (n.$slidesCache = null),
                    (n.transformType = null),
                    (n.transitionType = null),
                    (n.visibilityChange = "visibilitychange"),
                    (n.windowWidth = 0),
                    (n.windowTimer = null),
                    (o = e(t).data("slick") || {}),
                    (n.options = e.extend({}, n.defaults, s, o)),
                    (n.currentSlide = n.options.initialSlide),
                    (n.originalSettings = n.options),
                    void 0 !== document.mozHidden
                        ? ((n.hidden = "mozHidden"), (n.visibilityChange = "mozvisibilitychange"))
                        : void 0 !== document.webkitHidden && ((n.hidden = "webkitHidden"), (n.visibilityChange = "webkitvisibilitychange")),
                    (n.autoPlay = e.proxy(n.autoPlay, n)),
                    (n.autoPlayClear = e.proxy(n.autoPlayClear, n)),
                    (n.autoPlayIterator = e.proxy(n.autoPlayIterator, n)),
                    (n.changeSlide = e.proxy(n.changeSlide, n)),
                    (n.clickHandler = e.proxy(n.clickHandler, n)),
                    (n.selectHandler = e.proxy(n.selectHandler, n)),
                    (n.setPosition = e.proxy(n.setPosition, n)),
                    (n.swipeHandler = e.proxy(n.swipeHandler, n)),
                    (n.dragHandler = e.proxy(n.dragHandler, n)),
                    (n.keyHandler = e.proxy(n.keyHandler, n)),
                    (n.instanceUid = i++),
                    (n.htmlExpr = /^(?:\s*(<[\w\W]+>)[^>]*)$/),
                    n.registerBreakpoints(),
                    n.init(!0);
            }
            var i = 0;
            return t;
        })()),
            (t.prototype.activateADA = function () {
                this.$slideTrack.find(".slick-active").attr({ "aria-hidden": "false" }).find("a, input, button, select").attr({ tabindex: "0" });
            }),
            (t.prototype.addSlide = t.prototype.slickAdd = function (t, i, s) {
                var o = this;
                if ("boolean" == typeof i) (s = i), (i = null);
                else if (i < 0 || i >= o.slideCount) return !1;
                o.unload(),
                    "number" == typeof i
                        ? 0 === i && 0 === o.$slides.length
                            ? e(t).appendTo(o.$slideTrack)
                            : s
                            ? e(t).insertBefore(o.$slides.eq(i))
                            : e(t).insertAfter(o.$slides.eq(i))
                        : !0 === s
                        ? e(t).prependTo(o.$slideTrack)
                        : e(t).appendTo(o.$slideTrack),
                    (o.$slides = o.$slideTrack.children(this.options.slide)),
                    o.$slideTrack.children(this.options.slide).detach(),
                    o.$slideTrack.append(o.$slides),
                    o.$slides.each(function (t, i) {
                        e(i).attr("data-slick-index", t);
                    }),
                    (o.$slidesCache = o.$slides),
                    o.reinit();
            }),
            (t.prototype.animateHeight = function () {
                var e = this;
                if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                    var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                    e.$list.animate({ height: t }, e.options.speed);
                }
            }),
            (t.prototype.animateSlide = function (t, i) {
                var s = {},
                    o = this;
                o.animateHeight(),
                    !0 === o.options.rtl && !1 === o.options.vertical && (t = -t),
                    !1 === o.transformsEnabled
                        ? !1 === o.options.vertical
                            ? o.$slideTrack.animate({ left: t }, o.options.speed, o.options.easing, i)
                            : o.$slideTrack.animate({ top: t }, o.options.speed, o.options.easing, i)
                        : !1 === o.cssTransitions
                        ? (!0 === o.options.rtl && (o.currentLeft = -o.currentLeft),
                          e({ animStart: o.currentLeft }).animate(
                              { animStart: t },
                              {
                                  duration: o.options.speed,
                                  easing: o.options.easing,
                                  step: function (e) {
                                      (e = Math.ceil(e)), !1 === o.options.vertical ? ((s[o.animType] = "translate(" + e + "px, 0px)"), o.$slideTrack.css(s)) : ((s[o.animType] = "translate(0px," + e + "px)"), o.$slideTrack.css(s));
                                  },
                                  complete: function () {
                                      i && i.call();
                                  },
                              }
                          ))
                        : (o.applyTransition(),
                          (t = Math.ceil(t)),
                          !1 === o.options.vertical ? (s[o.animType] = "translate3d(" + t + "px, 0px, 0px)") : (s[o.animType] = "translate3d(0px," + t + "px, 0px)"),
                          o.$slideTrack.css(s),
                          i &&
                              setTimeout(function () {
                                  o.disableTransition(), i.call();
                              }, o.options.speed));
            }),
            (t.prototype.getNavTarget = function () {
                var t = this,
                    i = t.options.asNavFor;
                return i && null !== i && (i = e(i).not(t.$slider)), i;
            }),
            (t.prototype.asNavFor = function (t) {
                var i = this,
                    s = i.getNavTarget();
                null !== s &&
                    "object" == typeof s &&
                    s.each(function () {
                        var i = e(this).slick("getSlick");
                        i.unslicked || i.slideHandler(t, !0);
                    });
            }),
            (t.prototype.applyTransition = function (e) {
                var t = this,
                    i = {};
                !1 === t.options.fade ? (i[t.transitionType] = t.transformType + " " + t.options.speed + "ms " + t.options.cssEase) : (i[t.transitionType] = "opacity " + t.options.speed + "ms " + t.options.cssEase),
                    !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
            }),
            (t.prototype.autoPlay = function () {
                var e = this;
                e.autoPlayClear(), e.slideCount > e.options.slidesToShow && (e.autoPlayTimer = setInterval(e.autoPlayIterator, e.options.autoplaySpeed));
            }),
            (t.prototype.autoPlayClear = function () {
                var e = this;
                e.autoPlayTimer && clearInterval(e.autoPlayTimer);
            }),
            (t.prototype.autoPlayIterator = function () {
                var e = this,
                    t = e.currentSlide + e.options.slidesToScroll;
                e.paused ||
                    e.interrupted ||
                    e.focussed ||
                    (!1 === e.options.infinite &&
                        (1 === e.direction && e.currentSlide + 1 === e.slideCount - 1 ? (e.direction = 0) : 0 === e.direction && ((t = e.currentSlide - e.options.slidesToScroll), e.currentSlide - 1 == 0 && (e.direction = 1))),
                    e.slideHandler(t));
            }),
            (t.prototype.buildArrows = function () {
                var t = this;
                !0 === t.options.arrows &&
                    ((t.$prevArrow = e(t.options.prevArrow).addClass("slick-arrow")),
                    (t.$nextArrow = e(t.options.nextArrow).addClass("slick-arrow")),
                    t.slideCount > t.options.slidesToShow
                        ? (t.$prevArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          t.$nextArrow.removeClass("slick-hidden").removeAttr("aria-hidden tabindex"),
                          t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.prependTo(t.options.appendArrows),
                          t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.appendTo(t.options.appendArrows),
                          !0 !== t.options.infinite && t.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"))
                        : t.$prevArrow.add(t.$nextArrow).addClass("slick-hidden").attr({ "aria-disabled": "true", tabindex: "-1" }));
            }),
            (t.prototype.buildDots = function () {
                var t,
                    i,
                    s = this;
                if (!0 === s.options.dots && s.slideCount > s.options.slidesToShow) {
                    for (s.$slider.addClass("slick-dotted"), i = e("<ul />").addClass(s.options.dotsClass), t = 0; t <= s.getDotCount(); t += 1) i.append(e("<li />").append(s.options.customPaging.call(this, s, t)));
                    (s.$dots = i.appendTo(s.options.appendDots)), s.$dots.find("li").first().addClass("slick-active");
                }
            }),
            (t.prototype.buildOut = function () {
                var t = this;
                (t.$slides = t.$slider.children(t.options.slide + ":not(.slick-cloned)").addClass("slick-slide")),
                    (t.slideCount = t.$slides.length),
                    t.$slides.each(function (t, i) {
                        e(i)
                            .attr("data-slick-index", t)
                            .data("originalStyling", e(i).attr("style") || "");
                    }),
                    t.$slider.addClass("slick-slider"),
                    (t.$slideTrack = 0 === t.slideCount ? e('<div class="slick-track"/>').appendTo(t.$slider) : t.$slides.wrapAll('<div class="slick-track"/>').parent()),
                    (t.$list = t.$slideTrack.wrap('<div class="slick-list"/>').parent()),
                    t.$slideTrack.css("opacity", 0),
                    (!0 !== t.options.centerMode && !0 !== t.options.swipeToSlide) || (t.options.slidesToScroll = 1),
                    e("img[data-lazy]", t.$slider).not("[src]").addClass("slick-loading"),
                    t.setupInfinite(),
                    t.buildArrows(),
                    t.buildDots(),
                    t.updateDots(),
                    t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                    !0 === t.options.draggable && t.$list.addClass("draggable");
            }),
            (t.prototype.buildRows = function () {
                var e,
                    t,
                    i,
                    s,
                    o,
                    n,
                    r,
                    l = this;
                if (((s = document.createDocumentFragment()), (n = l.$slider.children()), l.options.rows > 0)) {
                    for (r = l.options.slidesPerRow * l.options.rows, o = Math.ceil(n.length / r), e = 0; e < o; e++) {
                        var a = document.createElement("div");
                        for (t = 0; t < l.options.rows; t++) {
                            var d = document.createElement("div");
                            for (i = 0; i < l.options.slidesPerRow; i++) {
                                var c = e * r + (t * l.options.slidesPerRow + i);
                                n.get(c) && d.appendChild(n.get(c));
                            }
                            a.appendChild(d);
                        }
                        s.appendChild(a);
                    }
                    l.$slider.empty().append(s),
                        l.$slider
                            .children()
                            .children()
                            .children()
                            .css({ width: 100 / l.options.slidesPerRow + "%", display: "inline-block" });
                }
            }),
            (t.prototype.checkResponsive = function (t, i) {
                var s,
                    o,
                    n,
                    r = this,
                    l = !1,
                    a = r.$slider.width(),
                    d = window.innerWidth || e(window).width();
                if (("window" === r.respondTo ? (n = d) : "slider" === r.respondTo ? (n = a) : "min" === r.respondTo && (n = Math.min(d, a)), r.options.responsive && r.options.responsive.length && null !== r.options.responsive)) {
                    o = null;
                    for (s in r.breakpoints) r.breakpoints.hasOwnProperty(s) && (!1 === r.originalSettings.mobileFirst ? n < r.breakpoints[s] && (o = r.breakpoints[s]) : n > r.breakpoints[s] && (o = r.breakpoints[s]));
                    null !== o
                        ? null !== r.activeBreakpoint
                            ? (o !== r.activeBreakpoint || i) &&
                              ((r.activeBreakpoint = o),
                              "unslick" === r.breakpointSettings[o] ? r.unslick(o) : ((r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o])), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)),
                              (l = o))
                            : ((r.activeBreakpoint = o),
                              "unslick" === r.breakpointSettings[o] ? r.unslick(o) : ((r.options = e.extend({}, r.originalSettings, r.breakpointSettings[o])), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t)),
                              (l = o))
                        : null !== r.activeBreakpoint && ((r.activeBreakpoint = null), (r.options = r.originalSettings), !0 === t && (r.currentSlide = r.options.initialSlide), r.refresh(t), (l = o)),
                        t || !1 === l || r.$slider.trigger("breakpoint", [r, l]);
                }
            }),
            (t.prototype.changeSlide = function (t, i) {
                var s,
                    o,
                    n,
                    r = this,
                    l = e(t.currentTarget);
                switch ((l.is("a") && t.preventDefault(), l.is("li") || (l = l.closest("li")), (n = r.slideCount % r.options.slidesToScroll != 0), (s = n ? 0 : (r.slideCount - r.currentSlide) % r.options.slidesToScroll), t.data.message)) {
                    case "previous":
                        (o = 0 === s ? r.options.slidesToScroll : r.options.slidesToShow - s), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide - o, !1, i);
                        break;
                    case "next":
                        (o = 0 === s ? r.options.slidesToScroll : s), r.slideCount > r.options.slidesToShow && r.slideHandler(r.currentSlide + o, !1, i);
                        break;
                    case "index":
                        var a = 0 === t.data.index ? 0 : t.data.index || l.index() * r.options.slidesToScroll;
                        r.slideHandler(r.checkNavigable(a), !1, i), l.children().trigger("focus");
                        break;
                    default:
                        return;
                }
            }),
            (t.prototype.checkNavigable = function (e) {
                var t,
                    i,
                    s = this;
                if (((t = s.getNavigableIndexes()), (i = 0), e > t[t.length - 1])) e = t[t.length - 1];
                else
                    for (var o in t) {
                        if (e < t[o]) {
                            e = i;
                            break;
                        }
                        i = t[o];
                    }
                return e;
            }),
            (t.prototype.cleanUpEvents = function () {
                var t = this;
                t.options.dots &&
                    null !== t.$dots &&
                    (e("li", t.$dots).off("click.slick", t.changeSlide).off("mouseenter.slick", e.proxy(t.interrupt, t, !0)).off("mouseleave.slick", e.proxy(t.interrupt, t, !1)),
                    !0 === t.options.accessibility && t.$dots.off("keydown.slick", t.keyHandler)),
                    t.$slider.off("focus.slick blur.slick"),
                    !0 === t.options.arrows &&
                        t.slideCount > t.options.slidesToShow &&
                        (t.$prevArrow && t.$prevArrow.off("click.slick", t.changeSlide),
                        t.$nextArrow && t.$nextArrow.off("click.slick", t.changeSlide),
                        !0 === t.options.accessibility && (t.$prevArrow && t.$prevArrow.off("keydown.slick", t.keyHandler), t.$nextArrow && t.$nextArrow.off("keydown.slick", t.keyHandler))),
                    t.$list.off("touchstart.slick mousedown.slick", t.swipeHandler),
                    t.$list.off("touchmove.slick mousemove.slick", t.swipeHandler),
                    t.$list.off("touchend.slick mouseup.slick", t.swipeHandler),
                    t.$list.off("touchcancel.slick mouseleave.slick", t.swipeHandler),
                    t.$list.off("click.slick", t.clickHandler),
                    e(document).off(t.visibilityChange, t.visibility),
                    t.cleanUpSlideEvents(),
                    !0 === t.options.accessibility && t.$list.off("keydown.slick", t.keyHandler),
                    !0 === t.options.focusOnSelect && e(t.$slideTrack).children().off("click.slick", t.selectHandler),
                    e(window).off("orientationchange.slick.slick-" + t.instanceUid, t.orientationChange),
                    e(window).off("resize.slick.slick-" + t.instanceUid, t.resize),
                    e("[draggable!=true]", t.$slideTrack).off("dragstart", t.preventDefault),
                    e(window).off("load.slick.slick-" + t.instanceUid, t.setPosition);
            }),
            (t.prototype.cleanUpSlideEvents = function () {
                var t = this;
                t.$list.off("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.off("mouseleave.slick", e.proxy(t.interrupt, t, !1));
            }),
            (t.prototype.cleanUpRows = function () {
                var e,
                    t = this;
                t.options.rows > 0 && ((e = t.$slides.children().children()), e.removeAttr("style"), t.$slider.empty().append(e));
            }),
            (t.prototype.clickHandler = function (e) {
                !1 === this.shouldClick && (e.stopImmediatePropagation(), e.stopPropagation(), e.preventDefault());
            }),
            (t.prototype.destroy = function (t) {
                var i = this;
                i.autoPlayClear(),
                    (i.touchObject = {}),
                    i.cleanUpEvents(),
                    e(".slick-cloned", i.$slider).detach(),
                    i.$dots && i.$dots.remove(),
                    i.$prevArrow &&
                        i.$prevArrow.length &&
                        (i.$prevArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.prevArrow) && i.$prevArrow.remove()),
                    i.$nextArrow &&
                        i.$nextArrow.length &&
                        (i.$nextArrow.removeClass("slick-disabled slick-arrow slick-hidden").removeAttr("aria-hidden aria-disabled tabindex").css("display", ""), i.htmlExpr.test(i.options.nextArrow) && i.$nextArrow.remove()),
                    i.$slides &&
                        (i.$slides
                            .removeClass("slick-slide slick-active slick-center slick-visible slick-current")
                            .removeAttr("aria-hidden")
                            .removeAttr("data-slick-index")
                            .each(function () {
                                e(this).attr("style", e(this).data("originalStyling"));
                            }),
                        i.$slideTrack.children(this.options.slide).detach(),
                        i.$slideTrack.detach(),
                        i.$list.detach(),
                        i.$slider.append(i.$slides)),
                    i.cleanUpRows(),
                    i.$slider.removeClass("slick-slider"),
                    i.$slider.removeClass("slick-initialized"),
                    i.$slider.removeClass("slick-dotted"),
                    (i.unslicked = !0),
                    t || i.$slider.trigger("destroy", [i]);
            }),
            (t.prototype.disableTransition = function (e) {
                var t = this,
                    i = {};
                (i[t.transitionType] = ""), !1 === t.options.fade ? t.$slideTrack.css(i) : t.$slides.eq(e).css(i);
            }),
            (t.prototype.fadeSlide = function (e, t) {
                var i = this;
                !1 === i.cssTransitions
                    ? (i.$slides.eq(e).css({ zIndex: i.options.zIndex }), i.$slides.eq(e).animate({ opacity: 1 }, i.options.speed, i.options.easing, t))
                    : (i.applyTransition(e),
                      i.$slides.eq(e).css({ opacity: 1, zIndex: i.options.zIndex }),
                      t &&
                          setTimeout(function () {
                              i.disableTransition(e), t.call();
                          }, i.options.speed));
            }),
            (t.prototype.fadeSlideOut = function (e) {
                var t = this;
                !1 === t.cssTransitions ? t.$slides.eq(e).animate({ opacity: 0, zIndex: t.options.zIndex - 2 }, t.options.speed, t.options.easing) : (t.applyTransition(e), t.$slides.eq(e).css({ opacity: 0, zIndex: t.options.zIndex - 2 }));
            }),
            (t.prototype.filterSlides = t.prototype.slickFilter = function (e) {
                var t = this;
                null !== e && ((t.$slidesCache = t.$slides), t.unload(), t.$slideTrack.children(this.options.slide).detach(), t.$slidesCache.filter(e).appendTo(t.$slideTrack), t.reinit());
            }),
            (t.prototype.focusHandler = function () {
                var t = this;
                t.$slider.off("focus.slick blur.slick").on("focus.slick blur.slick", "*", function (i) {
                    i.stopImmediatePropagation();
                    var s = e(this);
                    setTimeout(function () {
                        t.options.pauseOnFocus && ((t.focussed = s.is(":focus")), t.autoPlay());
                    }, 0);
                });
            }),
            (t.prototype.getCurrent = t.prototype.slickCurrentSlide = function () {
                return this.currentSlide;
            }),
            (t.prototype.getDotCount = function () {
                var e = this,
                    t = 0,
                    i = 0,
                    s = 0;
                if (!0 === e.options.infinite)
                    if (e.slideCount <= e.options.slidesToShow) ++s;
                    else for (; t < e.slideCount; ) ++s, (t = i + e.options.slidesToScroll), (i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                else if (!0 === e.options.centerMode) s = e.slideCount;
                else if (e.options.asNavFor) for (; t < e.slideCount; ) ++s, (t = i + e.options.slidesToScroll), (i += e.options.slidesToScroll <= e.options.slidesToShow ? e.options.slidesToScroll : e.options.slidesToShow);
                else s = 1 + Math.ceil((e.slideCount - e.options.slidesToShow) / e.options.slidesToScroll);
                return s - 1;
            }),
            (t.prototype.getLeft = function (e) {
                var t,
                    i,
                    s,
                    o,
                    n = this,
                    r = 0;
                return (
                    (n.slideOffset = 0),
                    (i = n.$slides.first().outerHeight(!0)),
                    !0 === n.options.infinite
                        ? (n.slideCount > n.options.slidesToShow &&
                              ((n.slideOffset = n.slideWidth * n.options.slidesToShow * -1),
                              (o = -1),
                              !0 === n.options.vertical && !0 === n.options.centerMode && (2 === n.options.slidesToShow ? (o = -1.5) : 1 === n.options.slidesToShow && (o = -2)),
                              (r = i * n.options.slidesToShow * o)),
                          n.slideCount % n.options.slidesToScroll != 0 &&
                              e + n.options.slidesToScroll > n.slideCount &&
                              n.slideCount > n.options.slidesToShow &&
                              (e > n.slideCount
                                  ? ((n.slideOffset = (n.options.slidesToShow - (e - n.slideCount)) * n.slideWidth * -1), (r = (n.options.slidesToShow - (e - n.slideCount)) * i * -1))
                                  : ((n.slideOffset = (n.slideCount % n.options.slidesToScroll) * n.slideWidth * -1), (r = (n.slideCount % n.options.slidesToScroll) * i * -1))))
                        : e + n.options.slidesToShow > n.slideCount && ((n.slideOffset = (e + n.options.slidesToShow - n.slideCount) * n.slideWidth), (r = (e + n.options.slidesToShow - n.slideCount) * i)),
                    n.slideCount <= n.options.slidesToShow && ((n.slideOffset = 0), (r = 0)),
                    !0 === n.options.centerMode && n.slideCount <= n.options.slidesToShow
                        ? (n.slideOffset = (n.slideWidth * Math.floor(n.options.slidesToShow)) / 2 - (n.slideWidth * n.slideCount) / 2)
                        : !0 === n.options.centerMode && !0 === n.options.infinite
                        ? (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2) - n.slideWidth)
                        : !0 === n.options.centerMode && ((n.slideOffset = 0), (n.slideOffset += n.slideWidth * Math.floor(n.options.slidesToShow / 2))),
                    (t = !1 === n.options.vertical ? e * n.slideWidth * -1 + n.slideOffset : e * i * -1 + r),
                    !0 === n.options.variableWidth &&
                        ((s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow)),
                        (t = !0 === n.options.rtl ? (s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0) : s[0] ? -1 * s[0].offsetLeft : 0),
                        !0 === n.options.centerMode &&
                            ((s = n.slideCount <= n.options.slidesToShow || !1 === n.options.infinite ? n.$slideTrack.children(".slick-slide").eq(e) : n.$slideTrack.children(".slick-slide").eq(e + n.options.slidesToShow + 1)),
                            (t = !0 === n.options.rtl ? (s[0] ? -1 * (n.$slideTrack.width() - s[0].offsetLeft - s.width()) : 0) : s[0] ? -1 * s[0].offsetLeft : 0),
                            (t += (n.$list.width() - s.outerWidth()) / 2))),
                    t
                );
            }),
            (t.prototype.getOption = t.prototype.slickGetOption = function (e) {
                return this.options[e];
            }),
            (t.prototype.getNavigableIndexes = function () {
                var e,
                    t = this,
                    i = 0,
                    s = 0,
                    o = [];
                for (!1 === t.options.infinite ? (e = t.slideCount) : ((i = -1 * t.options.slidesToScroll), (s = -1 * t.options.slidesToScroll), (e = 2 * t.slideCount)); i < e; )
                    o.push(i), (i = s + t.options.slidesToScroll), (s += t.options.slidesToScroll <= t.options.slidesToShow ? t.options.slidesToScroll : t.options.slidesToShow);
                return o;
            }),
            (t.prototype.getSlick = function () {
                return this;
            }),
            (t.prototype.getSlideCount = function () {
                var t,
                    i,
                    s = this;
                return (
                    (i = !0 === s.options.centerMode ? s.slideWidth * Math.floor(s.options.slidesToShow / 2) : 0),
                    !0 === s.options.swipeToSlide
                        ? (s.$slideTrack.find(".slick-slide").each(function (o, n) {
                              if (n.offsetLeft - i + e(n).outerWidth() / 2 > -1 * s.swipeLeft) return (t = n), !1;
                          }),
                          Math.abs(e(t).attr("data-slick-index") - s.currentSlide) || 1)
                        : s.options.slidesToScroll
                );
            }),
            (t.prototype.goTo = t.prototype.slickGoTo = function (e, t) {
                this.changeSlide({ data: { message: "index", index: parseInt(e) } }, t);
            }),
            (t.prototype.init = function (t) {
                var i = this;
                e(i.$slider).hasClass("slick-initialized") ||
                    (e(i.$slider).addClass("slick-initialized"), i.buildRows(), i.buildOut(), i.setProps(), i.startLoad(), i.loadSlider(), i.initializeEvents(), i.updateArrows(), i.updateDots(), i.checkResponsive(!0), i.focusHandler()),
                    t && i.$slider.trigger("init", [i]),
                    !0 === i.options.accessibility && i.initADA(),
                    i.options.autoplay && ((i.paused = !1), i.autoPlay());
            }),
            (t.prototype.initADA = function () {
                var t = this,
                    i = Math.ceil(t.slideCount / t.options.slidesToShow),
                    s = t.getNavigableIndexes().filter(function (e) {
                        return e >= 0 && e < t.slideCount;
                    });
                t.$slides.add(t.$slideTrack.find(".slick-cloned")).attr({ "aria-hidden": "true", tabindex: "-1" }).find("a, input, button, select").attr({ tabindex: "-1" }),
                    null !== t.$dots &&
                        (t.$slides.not(t.$slideTrack.find(".slick-cloned")).each(function (i) {
                            var o = s.indexOf(i);
                            if ((e(this).attr({ role: "tabpanel", id: "slick-slide" + t.instanceUid + i, tabindex: -1 }), -1 !== o)) {
                                var n = "slick-slide-control" + t.instanceUid + o;
                                e("#" + n).length && e(this).attr({ "aria-describedby": n });
                            }
                        }),
                        t.$dots
                            .attr("role", "tablist")
                            .find("li")
                            .each(function (o) {
                                var n = s[o];
                                e(this).attr({ role: "presentation" }),
                                    e(this)
                                        .find("button")
                                        .first()
                                        .attr({ role: "tab", id: "slick-slide-control" + t.instanceUid + o, "aria-controls": "slick-slide" + t.instanceUid + n, "aria-label": o + 1 + " of " + i, "aria-selected": null, tabindex: "-1" });
                            })
                            .eq(t.currentSlide)
                            .find("button")
                            .attr({ "aria-selected": "true", tabindex: "0" })
                            .end());
                for (var o = t.currentSlide, n = o + t.options.slidesToShow; o < n; o++) t.options.focusOnChange ? t.$slides.eq(o).attr({ tabindex: "0" }) : t.$slides.eq(o).removeAttr("tabindex");
                t.activateADA();
            }),
            (t.prototype.initArrowEvents = function () {
                var e = this;
                !0 === e.options.arrows &&
                    e.slideCount > e.options.slidesToShow &&
                    (e.$prevArrow.off("click.slick").on("click.slick", { message: "previous" }, e.changeSlide),
                    e.$nextArrow.off("click.slick").on("click.slick", { message: "next" }, e.changeSlide),
                    !0 === e.options.accessibility && (e.$prevArrow.on("keydown.slick", e.keyHandler), e.$nextArrow.on("keydown.slick", e.keyHandler)));
            }),
            (t.prototype.initDotEvents = function () {
                var t = this;
                !0 === t.options.dots && t.slideCount > t.options.slidesToShow && (e("li", t.$dots).on("click.slick", { message: "index" }, t.changeSlide), !0 === t.options.accessibility && t.$dots.on("keydown.slick", t.keyHandler)),
                    !0 === t.options.dots &&
                        !0 === t.options.pauseOnDotsHover &&
                        t.slideCount > t.options.slidesToShow &&
                        e("li", t.$dots).on("mouseenter.slick", e.proxy(t.interrupt, t, !0)).on("mouseleave.slick", e.proxy(t.interrupt, t, !1));
            }),
            (t.prototype.initSlideEvents = function () {
                var t = this;
                t.options.pauseOnHover && (t.$list.on("mouseenter.slick", e.proxy(t.interrupt, t, !0)), t.$list.on("mouseleave.slick", e.proxy(t.interrupt, t, !1)));
            }),
            (t.prototype.initializeEvents = function () {
                var t = this;
                t.initArrowEvents(),
                    t.initDotEvents(),
                    t.initSlideEvents(),
                    t.$list.on("touchstart.slick mousedown.slick", { action: "start" }, t.swipeHandler),
                    t.$list.on("touchmove.slick mousemove.slick", { action: "move" }, t.swipeHandler),
                    t.$list.on("touchend.slick mouseup.slick", { action: "end" }, t.swipeHandler),
                    t.$list.on("touchcancel.slick mouseleave.slick", { action: "end" }, t.swipeHandler),
                    t.$list.on("click.slick", t.clickHandler),
                    e(document).on(t.visibilityChange, e.proxy(t.visibility, t)),
                    !0 === t.options.accessibility && t.$list.on("keydown.slick", t.keyHandler),
                    !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
                    e(window).on("orientationchange.slick.slick-" + t.instanceUid, e.proxy(t.orientationChange, t)),
                    e(window).on("resize.slick.slick-" + t.instanceUid, e.proxy(t.resize, t)),
                    e("[draggable!=true]", t.$slideTrack).on("dragstart", t.preventDefault),
                    e(window).on("load.slick.slick-" + t.instanceUid, t.setPosition),
                    e(t.setPosition);
            }),
            (t.prototype.initUI = function () {
                var e = this;
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.show(), e.$nextArrow.show()), !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.show();
            }),
            (t.prototype.keyHandler = function (e) {
                var t = this;
                e.target.tagName.match("TEXTAREA|INPUT|SELECT") ||
                    (37 === e.keyCode && !0 === t.options.accessibility
                        ? t.changeSlide({ data: { message: !0 === t.options.rtl ? "next" : "previous" } })
                        : 39 === e.keyCode && !0 === t.options.accessibility && t.changeSlide({ data: { message: !0 === t.options.rtl ? "previous" : "next" } }));
            }),
            (t.prototype.lazyLoad = function () {
                function t(t) {
                    e("img[data-lazy]", t).each(function () {
                        var t = e(this),
                            i = e(this).attr("data-lazy"),
                            s = e(this).attr("data-srcset"),
                            o = e(this).attr("data-sizes") || r.$slider.attr("data-sizes"),
                            n = document.createElement("img");
                        (n.onload = function () {
                            t.animate({ opacity: 0 }, 100, function () {
                                s && (t.attr("srcset", s), o && t.attr("sizes", o)),
                                    t.attr("src", i).animate({ opacity: 1 }, 200, function () {
                                        t.removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading");
                                    }),
                                    r.$slider.trigger("lazyLoaded", [r, t, i]);
                            });
                        }),
                            (n.onerror = function () {
                                t.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), r.$slider.trigger("lazyLoadError", [r, t, i]);
                            }),
                            (n.src = i);
                    });
                }
                var i,
                    s,
                    o,
                    n,
                    r = this;
                if (
                    (!0 === r.options.centerMode
                        ? !0 === r.options.infinite
                            ? ((o = r.currentSlide + (r.options.slidesToShow / 2 + 1)), (n = o + r.options.slidesToShow + 2))
                            : ((o = Math.max(0, r.currentSlide - (r.options.slidesToShow / 2 + 1))), (n = r.options.slidesToShow / 2 + 1 + 2 + r.currentSlide))
                        : ((o = r.options.infinite ? r.options.slidesToShow + r.currentSlide : r.currentSlide), (n = Math.ceil(o + r.options.slidesToShow)), !0 === r.options.fade && (o > 0 && o--, n <= r.slideCount && n++)),
                    (i = r.$slider.find(".slick-slide").slice(o, n)),
                    "anticipated" === r.options.lazyLoad)
                )
                    for (var l = o - 1, a = n, d = r.$slider.find(".slick-slide"), c = 0; c < r.options.slidesToScroll; c++) l < 0 && (l = r.slideCount - 1), (i = i.add(d.eq(l))), (i = i.add(d.eq(a))), l--, a++;
                t(i),
                    r.slideCount <= r.options.slidesToShow
                        ? ((s = r.$slider.find(".slick-slide")), t(s))
                        : r.currentSlide >= r.slideCount - r.options.slidesToShow
                        ? ((s = r.$slider.find(".slick-cloned").slice(0, r.options.slidesToShow)), t(s))
                        : 0 === r.currentSlide && ((s = r.$slider.find(".slick-cloned").slice(-1 * r.options.slidesToShow)), t(s));
            }),
            (t.prototype.loadSlider = function () {
                var e = this;
                e.setPosition(), e.$slideTrack.css({ opacity: 1 }), e.$slider.removeClass("slick-loading"), e.initUI(), "progressive" === e.options.lazyLoad && e.progressiveLazyLoad();
            }),
            (t.prototype.next = t.prototype.slickNext = function () {
                this.changeSlide({ data: { message: "next" } });
            }),
            (t.prototype.orientationChange = function () {
                var e = this;
                e.checkResponsive(), e.setPosition();
            }),
            (t.prototype.pause = t.prototype.slickPause = function () {
                var e = this;
                e.autoPlayClear(), (e.paused = !0);
            }),
            (t.prototype.play = t.prototype.slickPlay = function () {
                var e = this;
                e.autoPlay(), (e.options.autoplay = !0), (e.paused = !1), (e.focussed = !1), (e.interrupted = !1);
            }),
            (t.prototype.postSlide = function (t) {
                var i = this;
                if (
                    !i.unslicked &&
                    (i.$slider.trigger("afterChange", [i, t]),
                    (i.animating = !1),
                    i.slideCount > i.options.slidesToShow && i.setPosition(),
                    (i.swipeLeft = null),
                    i.options.autoplay && i.autoPlay(),
                    !0 === i.options.accessibility && (i.initADA(), i.options.focusOnChange))
                ) {
                    e(i.$slides.get(i.currentSlide)).attr("tabindex", 0).focus();
                }
            }),
            (t.prototype.prev = t.prototype.slickPrev = function () {
                this.changeSlide({ data: { message: "previous" } });
            }),
            (t.prototype.preventDefault = function (e) {
                e.preventDefault();
            }),
            (t.prototype.progressiveLazyLoad = function (t) {
                t = t || 1;
                var i,
                    s,
                    o,
                    n,
                    r,
                    l = this,
                    a = e("img[data-lazy]", l.$slider);
                a.length
                    ? ((i = a.first()),
                      (s = i.attr("data-lazy")),
                      (o = i.attr("data-srcset")),
                      (n = i.attr("data-sizes") || l.$slider.attr("data-sizes")),
                      (r = document.createElement("img")),
                      (r.onload = function () {
                          o && (i.attr("srcset", o), n && i.attr("sizes", n)),
                              i.attr("src", s).removeAttr("data-lazy data-srcset data-sizes").removeClass("slick-loading"),
                              !0 === l.options.adaptiveHeight && l.setPosition(),
                              l.$slider.trigger("lazyLoaded", [l, i, s]),
                              l.progressiveLazyLoad();
                      }),
                      (r.onerror = function () {
                          t < 3
                              ? setTimeout(function () {
                                    l.progressiveLazyLoad(t + 1);
                                }, 500)
                              : (i.removeAttr("data-lazy").removeClass("slick-loading").addClass("slick-lazyload-error"), l.$slider.trigger("lazyLoadError", [l, i, s]), l.progressiveLazyLoad());
                      }),
                      (r.src = s))
                    : l.$slider.trigger("allImagesLoaded", [l]);
            }),
            (t.prototype.refresh = function (t) {
                var i,
                    s,
                    o = this;
                (s = o.slideCount - o.options.slidesToShow),
                    !o.options.infinite && o.currentSlide > s && (o.currentSlide = s),
                    o.slideCount <= o.options.slidesToShow && (o.currentSlide = 0),
                    (i = o.currentSlide),
                    o.destroy(!0),
                    e.extend(o, o.initials, { currentSlide: i }),
                    o.init(),
                    t || o.changeSlide({ data: { message: "index", index: i } }, !1);
            }),
            (t.prototype.registerBreakpoints = function () {
                var t,
                    i,
                    s,
                    o = this,
                    n = o.options.responsive || null;
                if ("array" === e.type(n) && n.length) {
                    o.respondTo = o.options.respondTo || "window";
                    for (t in n)
                        if (((s = o.breakpoints.length - 1), n.hasOwnProperty(t))) {
                            for (i = n[t].breakpoint; s >= 0; ) o.breakpoints[s] && o.breakpoints[s] === i && o.breakpoints.splice(s, 1), s--;
                            o.breakpoints.push(i), (o.breakpointSettings[i] = n[t].settings);
                        }
                    o.breakpoints.sort(function (e, t) {
                        return o.options.mobileFirst ? e - t : t - e;
                    });
                }
            }),
            (t.prototype.reinit = function () {
                var t = this;
                (t.$slides = t.$slideTrack.children(t.options.slide).addClass("slick-slide")),
                    (t.slideCount = t.$slides.length),
                    t.currentSlide >= t.slideCount && 0 !== t.currentSlide && (t.currentSlide = t.currentSlide - t.options.slidesToScroll),
                    t.slideCount <= t.options.slidesToShow && (t.currentSlide = 0),
                    t.registerBreakpoints(),
                    t.setProps(),
                    t.setupInfinite(),
                    t.buildArrows(),
                    t.updateArrows(),
                    t.initArrowEvents(),
                    t.buildDots(),
                    t.updateDots(),
                    t.initDotEvents(),
                    t.cleanUpSlideEvents(),
                    t.initSlideEvents(),
                    t.checkResponsive(!1, !0),
                    !0 === t.options.focusOnSelect && e(t.$slideTrack).children().on("click.slick", t.selectHandler),
                    t.setSlideClasses("number" == typeof t.currentSlide ? t.currentSlide : 0),
                    t.setPosition(),
                    t.focusHandler(),
                    (t.paused = !t.options.autoplay),
                    t.autoPlay(),
                    t.$slider.trigger("reInit", [t]);
            }),
            (t.prototype.resize = function () {
                var t = this;
                e(window).width() !== t.windowWidth &&
                    (clearTimeout(t.windowDelay),
                    (t.windowDelay = window.setTimeout(function () {
                        (t.windowWidth = e(window).width()), t.checkResponsive(), t.unslicked || t.setPosition();
                    }, 50)));
            }),
            (t.prototype.removeSlide = t.prototype.slickRemove = function (e, t, i) {
                var s = this;
                if (("boolean" == typeof e ? ((t = e), (e = !0 === t ? 0 : s.slideCount - 1)) : (e = !0 === t ? --e : e), s.slideCount < 1 || e < 0 || e > s.slideCount - 1)) return !1;
                s.unload(),
                    !0 === i ? s.$slideTrack.children().remove() : s.$slideTrack.children(this.options.slide).eq(e).remove(),
                    (s.$slides = s.$slideTrack.children(this.options.slide)),
                    s.$slideTrack.children(this.options.slide).detach(),
                    s.$slideTrack.append(s.$slides),
                    (s.$slidesCache = s.$slides),
                    s.reinit();
            }),
            (t.prototype.setCSS = function (e) {
                var t,
                    i,
                    s = this,
                    o = {};
                !0 === s.options.rtl && (e = -e),
                    (t = "left" == s.positionProp ? Math.ceil(e) + "px" : "0px"),
                    (i = "top" == s.positionProp ? Math.ceil(e) + "px" : "0px"),
                    (o[s.positionProp] = e),
                    !1 === s.transformsEnabled
                        ? s.$slideTrack.css(o)
                        : ((o = {}), !1 === s.cssTransitions ? ((o[s.animType] = "translate(" + t + ", " + i + ")"), s.$slideTrack.css(o)) : ((o[s.animType] = "translate3d(" + t + ", " + i + ", 0px)"), s.$slideTrack.css(o)));
            }),
            (t.prototype.setDimensions = function () {
                var e = this;
                !1 === e.options.vertical
                    ? !0 === e.options.centerMode && e.$list.css({ padding: "0px " + e.options.centerPadding })
                    : (e.$list.height(e.$slides.first().outerHeight(!0) * e.options.slidesToShow), !0 === e.options.centerMode && e.$list.css({ padding: e.options.centerPadding + " 0px" })),
                    (e.listWidth = e.$list.width()),
                    (e.listHeight = e.$list.height()),
                    !1 === e.options.vertical && !1 === e.options.variableWidth
                        ? ((e.slideWidth = Math.ceil(e.listWidth / e.options.slidesToShow)), e.$slideTrack.width(Math.ceil(e.slideWidth * e.$slideTrack.children(".slick-slide").length)))
                        : !0 === e.options.variableWidth
                        ? e.$slideTrack.width(5e3 * e.slideCount)
                        : ((e.slideWidth = Math.ceil(e.listWidth)), e.$slideTrack.height(Math.ceil(e.$slides.first().outerHeight(!0) * e.$slideTrack.children(".slick-slide").length)));
                var t = e.$slides.first().outerWidth(!0) - e.$slides.first().width();
                !1 === e.options.variableWidth && e.$slideTrack.children(".slick-slide").width(e.slideWidth - t);
            }),
            (t.prototype.setFade = function () {
                var t,
                    i = this;
                i.$slides.each(function (s, o) {
                    (t = i.slideWidth * s * -1),
                        !0 === i.options.rtl ? e(o).css({ position: "relative", right: t, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 }) : e(o).css({ position: "relative", left: t, top: 0, zIndex: i.options.zIndex - 2, opacity: 0 });
                }),
                    i.$slides.eq(i.currentSlide).css({ zIndex: i.options.zIndex - 1, opacity: 1 });
            }),
            (t.prototype.setHeight = function () {
                var e = this;
                if (1 === e.options.slidesToShow && !0 === e.options.adaptiveHeight && !1 === e.options.vertical) {
                    var t = e.$slides.eq(e.currentSlide).outerHeight(!0);
                    e.$list.css("height", t);
                }
            }),
            (t.prototype.setOption = t.prototype.slickSetOption = function () {
                var t,
                    i,
                    s,
                    o,
                    n,
                    r = this,
                    l = !1;
                if (
                    ("object" === e.type(arguments[0])
                        ? ((s = arguments[0]), (l = arguments[1]), (n = "multiple"))
                        : "string" === e.type(arguments[0]) &&
                          ((s = arguments[0]), (o = arguments[1]), (l = arguments[2]), "responsive" === arguments[0] && "array" === e.type(arguments[1]) ? (n = "responsive") : void 0 !== arguments[1] && (n = "single")),
                    "single" === n)
                )
                    r.options[s] = o;
                else if ("multiple" === n)
                    e.each(s, function (e, t) {
                        r.options[e] = t;
                    });
                else if ("responsive" === n)
                    for (i in o)
                        if ("array" !== e.type(r.options.responsive)) r.options.responsive = [o[i]];
                        else {
                            for (t = r.options.responsive.length - 1; t >= 0; ) r.options.responsive[t].breakpoint === o[i].breakpoint && r.options.responsive.splice(t, 1), t--;
                            r.options.responsive.push(o[i]);
                        }
                l && (r.unload(), r.reinit());
            }),
            (t.prototype.setPosition = function () {
                var e = this;
                e.setDimensions(), e.setHeight(), !1 === e.options.fade ? e.setCSS(e.getLeft(e.currentSlide)) : e.setFade(), e.$slider.trigger("setPosition", [e]);
            }),
            (t.prototype.setProps = function () {
                var e = this,
                    t = document.body.style;
                (e.positionProp = !0 === e.options.vertical ? "top" : "left"),
                    "top" === e.positionProp ? e.$slider.addClass("slick-vertical") : e.$slider.removeClass("slick-vertical"),
                    (void 0 === t.WebkitTransition && void 0 === t.MozTransition && void 0 === t.msTransition) || (!0 === e.options.useCSS && (e.cssTransitions = !0)),
                    e.options.fade && ("number" == typeof e.options.zIndex ? e.options.zIndex < 3 && (e.options.zIndex = 3) : (e.options.zIndex = e.defaults.zIndex)),
                    void 0 !== t.OTransform && ((e.animType = "OTransform"), (e.transformType = "-o-transform"), (e.transitionType = "OTransition"), void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
                    void 0 !== t.MozTransform &&
                        ((e.animType = "MozTransform"), (e.transformType = "-moz-transform"), (e.transitionType = "MozTransition"), void 0 === t.perspectiveProperty && void 0 === t.MozPerspective && (e.animType = !1)),
                    void 0 !== t.webkitTransform &&
                        ((e.animType = "webkitTransform"), (e.transformType = "-webkit-transform"), (e.transitionType = "webkitTransition"), void 0 === t.perspectiveProperty && void 0 === t.webkitPerspective && (e.animType = !1)),
                    void 0 !== t.msTransform && ((e.animType = "msTransform"), (e.transformType = "-ms-transform"), (e.transitionType = "msTransition"), void 0 === t.msTransform && (e.animType = !1)),
                    void 0 !== t.transform && !1 !== e.animType && ((e.animType = "transform"), (e.transformType = "transform"), (e.transitionType = "transition")),
                    (e.transformsEnabled = e.options.useTransform && null !== e.animType && !1 !== e.animType);
            }),
            (t.prototype.setSlideClasses = function (e) {
                var t,
                    i,
                    s,
                    o,
                    n = this;
                if (((i = n.$slider.find(".slick-slide").removeClass("slick-active slick-center slick-current").attr("aria-hidden", "true")), n.$slides.eq(e).addClass("slick-current"), !0 === n.options.centerMode)) {
                    var r = n.options.slidesToShow % 2 == 0 ? 1 : 0;
                    (t = Math.floor(n.options.slidesToShow / 2)),
                        !0 === n.options.infinite &&
                            (e >= t && e <= n.slideCount - 1 - t
                                ? n.$slides
                                      .slice(e - t + r, e + t + 1)
                                      .addClass("slick-active")
                                      .attr("aria-hidden", "false")
                                : ((s = n.options.slidesToShow + e),
                                  i
                                      .slice(s - t + 1 + r, s + t + 2)
                                      .addClass("slick-active")
                                      .attr("aria-hidden", "false")),
                            0 === e ? i.eq(i.length - 1 - n.options.slidesToShow).addClass("slick-center") : e === n.slideCount - 1 && i.eq(n.options.slidesToShow).addClass("slick-center")),
                        n.$slides.eq(e).addClass("slick-center");
                } else
                    e >= 0 && e <= n.slideCount - n.options.slidesToShow
                        ? n.$slides
                              .slice(e, e + n.options.slidesToShow)
                              .addClass("slick-active")
                              .attr("aria-hidden", "false")
                        : i.length <= n.options.slidesToShow
                        ? i.addClass("slick-active").attr("aria-hidden", "false")
                        : ((o = n.slideCount % n.options.slidesToShow),
                          (s = !0 === n.options.infinite ? n.options.slidesToShow + e : e),
                          n.options.slidesToShow == n.options.slidesToScroll && n.slideCount - e < n.options.slidesToShow
                              ? i
                                    .slice(s - (n.options.slidesToShow - o), s + o)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false")
                              : i
                                    .slice(s, s + n.options.slidesToShow)
                                    .addClass("slick-active")
                                    .attr("aria-hidden", "false"));
                ("ondemand" !== n.options.lazyLoad && "anticipated" !== n.options.lazyLoad) || n.lazyLoad();
            }),
            (t.prototype.setupInfinite = function () {
                var t,
                    i,
                    s,
                    o = this;
                if ((!0 === o.options.fade && (o.options.centerMode = !1), !0 === o.options.infinite && !1 === o.options.fade && ((i = null), o.slideCount > o.options.slidesToShow))) {
                    for (s = !0 === o.options.centerMode ? o.options.slidesToShow + 1 : o.options.slidesToShow, t = o.slideCount; t > o.slideCount - s; t -= 1)
                        (i = t - 1),
                            e(o.$slides[i])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", i - o.slideCount)
                                .prependTo(o.$slideTrack)
                                .addClass("slick-cloned");
                    for (t = 0; t < s + o.slideCount; t += 1)
                        (i = t),
                            e(o.$slides[i])
                                .clone(!0)
                                .attr("id", "")
                                .attr("data-slick-index", i + o.slideCount)
                                .appendTo(o.$slideTrack)
                                .addClass("slick-cloned");
                    o.$slideTrack
                        .find(".slick-cloned")
                        .find("[id]")
                        .each(function () {
                            e(this).attr("id", "");
                        });
                }
            }),
            (t.prototype.interrupt = function (e) {
                var t = this;
                e || t.autoPlay(), (t.interrupted = e);
            }),
            (t.prototype.selectHandler = function (t) {
                var i = this,
                    s = e(t.target).is(".slick-slide") ? e(t.target) : e(t.target).parents(".slick-slide"),
                    o = parseInt(s.attr("data-slick-index"));
                if ((o || (o = 0), i.slideCount <= i.options.slidesToShow)) return void i.slideHandler(o, !1, !0);
                i.slideHandler(o);
            }),
            (t.prototype.slideHandler = function (e, t, i) {
                var s,
                    o,
                    n,
                    r,
                    l,
                    a = null,
                    d = this;
                if (((t = t || !1), !((!0 === d.animating && !0 === d.options.waitForAnimate) || (!0 === d.options.fade && d.currentSlide === e)))) {
                    if (
                        (!1 === t && d.asNavFor(e),
                        (s = e),
                        (a = d.getLeft(s)),
                        (r = d.getLeft(d.currentSlide)),
                        (d.currentLeft = null === d.swipeLeft ? r : d.swipeLeft),
                        !1 === d.options.infinite && !1 === d.options.centerMode && (e < 0 || e > d.getDotCount() * d.options.slidesToScroll))
                    )
                        return void (
                            !1 === d.options.fade &&
                            ((s = d.currentSlide),
                            !0 !== i && d.slideCount > d.options.slidesToShow
                                ? d.animateSlide(r, function () {
                                      d.postSlide(s);
                                  })
                                : d.postSlide(s))
                        );
                    if (!1 === d.options.infinite && !0 === d.options.centerMode && (e < 0 || e > d.slideCount - d.options.slidesToScroll))
                        return void (
                            !1 === d.options.fade &&
                            ((s = d.currentSlide),
                            !0 !== i && d.slideCount > d.options.slidesToShow
                                ? d.animateSlide(r, function () {
                                      d.postSlide(s);
                                  })
                                : d.postSlide(s))
                        );
                    if (
                        (d.options.autoplay && clearInterval(d.autoPlayTimer),
                        (o =
                            s < 0
                                ? d.slideCount % d.options.slidesToScroll != 0
                                    ? d.slideCount - (d.slideCount % d.options.slidesToScroll)
                                    : d.slideCount + s
                                : s >= d.slideCount
                                ? d.slideCount % d.options.slidesToScroll != 0
                                    ? 0
                                    : s - d.slideCount
                                : s),
                        (d.animating = !0),
                        d.$slider.trigger("beforeChange", [d, d.currentSlide, o]),
                        (n = d.currentSlide),
                        (d.currentSlide = o),
                        d.setSlideClasses(d.currentSlide),
                        d.options.asNavFor && ((l = d.getNavTarget()), (l = l.slick("getSlick")), l.slideCount <= l.options.slidesToShow && l.setSlideClasses(d.currentSlide)),
                        d.updateDots(),
                        d.updateArrows(),
                        !0 === d.options.fade)
                    )
                        return (
                            !0 !== i
                                ? (d.fadeSlideOut(n),
                                  d.fadeSlide(o, function () {
                                      d.postSlide(o);
                                  }))
                                : d.postSlide(o),
                            void d.animateHeight()
                        );
                    !0 !== i && d.slideCount > d.options.slidesToShow
                        ? d.animateSlide(a, function () {
                              d.postSlide(o);
                          })
                        : d.postSlide(o);
                }
            }),
            (t.prototype.startLoad = function () {
                var e = this;
                !0 === e.options.arrows && e.slideCount > e.options.slidesToShow && (e.$prevArrow.hide(), e.$nextArrow.hide()),
                    !0 === e.options.dots && e.slideCount > e.options.slidesToShow && e.$dots.hide(),
                    e.$slider.addClass("slick-loading");
            }),
            (t.prototype.swipeDirection = function () {
                var e,
                    t,
                    i,
                    s,
                    o = this;
                return (
                    (e = o.touchObject.startX - o.touchObject.curX),
                    (t = o.touchObject.startY - o.touchObject.curY),
                    (i = Math.atan2(t, e)),
                    (s = Math.round((180 * i) / Math.PI)),
                    s < 0 && (s = 360 - Math.abs(s)),
                    s <= 45 && s >= 0
                        ? !1 === o.options.rtl
                            ? "left"
                            : "right"
                        : s <= 360 && s >= 315
                        ? !1 === o.options.rtl
                            ? "left"
                            : "right"
                        : s >= 135 && s <= 225
                        ? !1 === o.options.rtl
                            ? "right"
                            : "left"
                        : !0 === o.options.verticalSwiping
                        ? s >= 35 && s <= 135
                            ? "down"
                            : "up"
                        : "vertical"
                );
            }),
            (t.prototype.swipeEnd = function (e) {
                var t,
                    i,
                    s = this;
                if (((s.dragging = !1), (s.swiping = !1), s.scrolling)) return (s.scrolling = !1), !1;
                if (((s.interrupted = !1), (s.shouldClick = !(s.touchObject.swipeLength > 10)), void 0 === s.touchObject.curX)) return !1;
                if ((!0 === s.touchObject.edgeHit && s.$slider.trigger("edge", [s, s.swipeDirection()]), s.touchObject.swipeLength >= s.touchObject.minSwipe)) {
                    switch ((i = s.swipeDirection())) {
                        case "left":
                        case "down":
                            (t = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide + s.getSlideCount()) : s.currentSlide + s.getSlideCount()), (s.currentDirection = 0);
                            break;
                        case "right":
                        case "up":
                            (t = s.options.swipeToSlide ? s.checkNavigable(s.currentSlide - s.getSlideCount()) : s.currentSlide - s.getSlideCount()), (s.currentDirection = 1);
                    }
                    "vertical" != i && (s.slideHandler(t), (s.touchObject = {}), s.$slider.trigger("swipe", [s, i]));
                } else s.touchObject.startX !== s.touchObject.curX && (s.slideHandler(s.currentSlide), (s.touchObject = {}));
            }),
            (t.prototype.swipeHandler = function (e) {
                var t = this;
                if (!(!1 === t.options.swipe || ("ontouchend" in document && !1 === t.options.swipe) || (!1 === t.options.draggable && -1 !== e.type.indexOf("mouse"))))
                    switch (
                        ((t.touchObject.fingerCount = e.originalEvent && void 0 !== e.originalEvent.touches ? e.originalEvent.touches.length : 1),
                        (t.touchObject.minSwipe = t.listWidth / t.options.touchThreshold),
                        !0 === t.options.verticalSwiping && (t.touchObject.minSwipe = t.listHeight / t.options.touchThreshold),
                        e.data.action)
                    ) {
                        case "start":
                            t.swipeStart(e);
                            break;
                        case "move":
                            t.swipeMove(e);
                            break;
                        case "end":
                            t.swipeEnd(e);
                    }
            }),
            (t.prototype.swipeMove = function (e) {
                var t,
                    i,
                    s,
                    o,
                    n,
                    r,
                    l = this;
                return (
                    (n = void 0 !== e.originalEvent ? e.originalEvent.touches : null),
                    !(!l.dragging || l.scrolling || (n && 1 !== n.length)) &&
                        ((t = l.getLeft(l.currentSlide)),
                        (l.touchObject.curX = void 0 !== n ? n[0].pageX : e.clientX),
                        (l.touchObject.curY = void 0 !== n ? n[0].pageY : e.clientY),
                        (l.touchObject.swipeLength = Math.round(Math.sqrt(Math.pow(l.touchObject.curX - l.touchObject.startX, 2)))),
                        (r = Math.round(Math.sqrt(Math.pow(l.touchObject.curY - l.touchObject.startY, 2)))),
                        !l.options.verticalSwiping && !l.swiping && r > 4
                            ? ((l.scrolling = !0), !1)
                            : (!0 === l.options.verticalSwiping && (l.touchObject.swipeLength = r),
                              (i = l.swipeDirection()),
                              void 0 !== e.originalEvent && l.touchObject.swipeLength > 4 && ((l.swiping = !0), e.preventDefault()),
                              (o = (!1 === l.options.rtl ? 1 : -1) * (l.touchObject.curX > l.touchObject.startX ? 1 : -1)),
                              !0 === l.options.verticalSwiping && (o = l.touchObject.curY > l.touchObject.startY ? 1 : -1),
                              (s = l.touchObject.swipeLength),
                              (l.touchObject.edgeHit = !1),
                              !1 === l.options.infinite &&
                                  ((0 === l.currentSlide && "right" === i) || (l.currentSlide >= l.getDotCount() && "left" === i)) &&
                                  ((s = l.touchObject.swipeLength * l.options.edgeFriction), (l.touchObject.edgeHit = !0)),
                              !1 === l.options.vertical ? (l.swipeLeft = t + s * o) : (l.swipeLeft = t + s * (l.$list.height() / l.listWidth) * o),
                              !0 === l.options.verticalSwiping && (l.swipeLeft = t + s * o),
                              !0 !== l.options.fade && !1 !== l.options.touchMove && (!0 === l.animating ? ((l.swipeLeft = null), !1) : void l.setCSS(l.swipeLeft))))
                );
            }),
            (t.prototype.swipeStart = function (e) {
                var t,
                    i = this;
                if (((i.interrupted = !0), 1 !== i.touchObject.fingerCount || i.slideCount <= i.options.slidesToShow)) return (i.touchObject = {}), !1;
                void 0 !== e.originalEvent && void 0 !== e.originalEvent.touches && (t = e.originalEvent.touches[0]),
                    (i.touchObject.startX = i.touchObject.curX = void 0 !== t ? t.pageX : e.clientX),
                    (i.touchObject.startY = i.touchObject.curY = void 0 !== t ? t.pageY : e.clientY),
                    (i.dragging = !0);
            }),
            (t.prototype.unfilterSlides = t.prototype.slickUnfilter = function () {
                var e = this;
                null !== e.$slidesCache && (e.unload(), e.$slideTrack.children(this.options.slide).detach(), e.$slidesCache.appendTo(e.$slideTrack), e.reinit());
            }),
            (t.prototype.unload = function () {
                var t = this;
                e(".slick-cloned", t.$slider).remove(),
                    t.$dots && t.$dots.remove(),
                    t.$prevArrow && t.htmlExpr.test(t.options.prevArrow) && t.$prevArrow.remove(),
                    t.$nextArrow && t.htmlExpr.test(t.options.nextArrow) && t.$nextArrow.remove(),
                    t.$slides.removeClass("slick-slide slick-active slick-visible slick-current").attr("aria-hidden", "true").css("width", "");
            }),
            (t.prototype.unslick = function (e) {
                var t = this;
                t.$slider.trigger("unslick", [t, e]), t.destroy();
            }),
            (t.prototype.updateArrows = function () {
                var e = this;
                Math.floor(e.options.slidesToShow / 2),
                    !0 === e.options.arrows &&
                        e.slideCount > e.options.slidesToShow &&
                        !e.options.infinite &&
                        (e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"),
                        0 === e.currentSlide
                            ? (e.$prevArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$nextArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : e.currentSlide >= e.slideCount - e.options.slidesToShow && !1 === e.options.centerMode
                            ? (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false"))
                            : e.currentSlide >= e.slideCount - 1 &&
                              !0 === e.options.centerMode &&
                              (e.$nextArrow.addClass("slick-disabled").attr("aria-disabled", "true"), e.$prevArrow.removeClass("slick-disabled").attr("aria-disabled", "false")));
            }),
            (t.prototype.updateDots = function () {
                var e = this;
                null !== e.$dots &&
                    (e.$dots.find("li").removeClass("slick-active").end(),
                    e.$dots
                        .find("li")
                        .eq(Math.floor(e.currentSlide / e.options.slidesToScroll))
                        .addClass("slick-active"));
            }),
            (t.prototype.visibility = function () {
                var e = this;
                e.options.autoplay && (document[e.hidden] ? (e.interrupted = !0) : (e.interrupted = !1));
            }),
            (e.fn.slick = function () {
                var e,
                    i,
                    s = this,
                    o = arguments[0],
                    n = Array.prototype.slice.call(arguments, 1),
                    r = s.length;
                for (e = 0; e < r; e++) if (("object" == typeof o || void 0 === o ? (s[e].slick = new t(s[e], o)) : (i = s[e].slick[o].apply(s[e].slick, n)), void 0 !== i)) return i;
                return s;
            });
    }),
    (function (e, t) {
        "object" == typeof exports && "object" == typeof module ? (module.exports = t()) : "function" == typeof define && define.amd ? define([], t) : "object" == typeof exports ? (exports.Typed = t()) : (e.Typed = t());
    })(this, function () {
        return (function (e) {
            function t(s) {
                if (i[s]) return i[s].exports;
                var o = (i[s] = { exports: {}, id: s, loaded: !1 });
                return e[s].call(o.exports, o, o.exports, t), (o.loaded = !0), o.exports;
            }
            var i = {};
            return (t.m = e), (t.c = i), (t.p = ""), t(0);
        })([
            function (e, t, i) {
                "use strict";
                function s(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }
                Object.defineProperty(t, "__esModule", { value: !0 });
                var o = (function () {
                        function e(e, t) {
                            for (var i = 0; i < t.length; i++) {
                                var s = t[i];
                                (s.enumerable = s.enumerable || !1), (s.configurable = !0), "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
                            }
                        }
                        return function (t, i, s) {
                            return i && e(t.prototype, i), s && e(t, s), t;
                        };
                    })(),
                    n = i(1),
                    r = i(3),
                    l = (function () {
                        function e(t, i) {
                            s(this, e), n.initializer.load(this, i, t), this.begin();
                        }
                        return (
                            o(e, [
                                {
                                    key: "toggle",
                                    value: function () {
                                        this.pause.status ? this.start() : this.stop();
                                    },
                                },
                                {
                                    key: "stop",
                                    value: function () {
                                        this.typingComplete || this.pause.status || (this.toggleBlinking(!0), (this.pause.status = !0), this.options.onStop(this.arrayPos, this));
                                    },
                                },
                                {
                                    key: "start",
                                    value: function () {
                                        this.typingComplete ||
                                            (this.pause.status &&
                                                ((this.pause.status = !1),
                                                this.pause.typewrite ? this.typewrite(this.pause.curString, this.pause.curStrPos) : this.backspace(this.pause.curString, this.pause.curStrPos),
                                                this.options.onStart(this.arrayPos, this)));
                                    },
                                },
                                {
                                    key: "destroy",
                                    value: function () {
                                        this.reset(!1), this.options.onDestroy(this);
                                    },
                                },
                                {
                                    key: "reset",
                                    value: function () {
                                        var e = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
                                        clearInterval(this.timeout),
                                            this.replaceText(""),
                                            this.cursor && this.cursor.parentNode && (this.cursor.parentNode.removeChild(this.cursor), (this.cursor = null)),
                                            (this.strPos = 0),
                                            (this.arrayPos = 0),
                                            (this.curLoop = 0),
                                            e && (this.insertCursor(), this.options.onReset(this), this.begin());
                                    },
                                },
                                {
                                    key: "begin",
                                    value: function () {
                                        var e = this;
                                        (this.typingComplete = !1),
                                            this.shuffleStringsIfNeeded(this),
                                            this.insertCursor(),
                                            this.bindInputFocusEvents && this.bindFocusEvents(),
                                            (this.timeout = setTimeout(function () {
                                                e.currentElContent && 0 !== e.currentElContent.length ? e.backspace(e.currentElContent, e.currentElContent.length) : e.typewrite(e.strings[e.sequence[e.arrayPos]], e.strPos);
                                            }, this.startDelay));
                                    },
                                },
                                {
                                    key: "typewrite",
                                    value: function (e, t) {
                                        var i = this;
                                        this.fadeOut && this.el.classList.contains(this.fadeOutClass) && (this.el.classList.remove(this.fadeOutClass), this.cursor && this.cursor.classList.remove(this.fadeOutClass));
                                        var s = this.humanizer(this.typeSpeed),
                                            o = 1;
                                        if (!0 === this.pause.status) return void this.setPauseStatus(e, t, !0);
                                        this.timeout = setTimeout(function () {
                                            t = r.htmlParser.typeHtmlChars(e, t, i);
                                            var s = 0,
                                                n = e.substr(t);
                                            if ("^" === n.charAt(0) && /^\^\d+/.test(n)) {
                                                var l = 1;
                                                (n = /\d+/.exec(n)[0]),
                                                    (l += n.length),
                                                    (s = parseInt(n)),
                                                    (i.temporaryPause = !0),
                                                    i.options.onTypingPaused(i.arrayPos, i),
                                                    (e = e.substring(0, t) + e.substring(t + l)),
                                                    i.toggleBlinking(!0);
                                            }
                                            if ("`" === n.charAt(0)) {
                                                for (; "`" !== e.substr(t + o).charAt(0) && (o++, !(t + o > e.length)); );
                                                var a = e.substring(0, t),
                                                    d = e.substring(a.length + 1, t + o),
                                                    c = e.substring(t + o + 1);
                                                (e = a + d + c), o--;
                                            }
                                            i.timeout = setTimeout(function () {
                                                i.toggleBlinking(!1), t >= e.length ? i.doneTyping(e, t) : i.keepTyping(e, t, o), i.temporaryPause && ((i.temporaryPause = !1), i.options.onTypingResumed(i.arrayPos, i));
                                            }, s);
                                        }, s);
                                    },
                                },
                                {
                                    key: "keepTyping",
                                    value: function (e, t, i) {
                                        0 === t && (this.toggleBlinking(!1), this.options.preStringTyped(this.arrayPos, this)), (t += i);
                                        var s = e.substr(0, t);
                                        this.replaceText(s), this.typewrite(e, t);
                                    },
                                },
                                {
                                    key: "doneTyping",
                                    value: function (e, t) {
                                        var i = this;
                                        this.options.onStringTyped(this.arrayPos, this),
                                            this.toggleBlinking(!0),
                                            (this.arrayPos === this.strings.length - 1 && (this.complete(), !1 === this.loop || this.curLoop === this.loopCount)) ||
                                                (this.timeout = setTimeout(function () {
                                                    i.backspace(e, t);
                                                }, this.backDelay));
                                    },
                                },
                                {
                                    key: "backspace",
                                    value: function (e, t) {
                                        var i = this;
                                        if (!0 === this.pause.status) return void this.setPauseStatus(e, t, !0);
                                        if (this.fadeOut) return this.initFadeOut();
                                        this.toggleBlinking(!1);
                                        var s = this.humanizer(this.backSpeed);
                                        this.timeout = setTimeout(function () {
                                            t = r.htmlParser.backSpaceHtmlChars(e, t, i);
                                            var s = e.substr(0, t);
                                            if ((i.replaceText(s), i.smartBackspace)) {
                                                var o = i.strings[i.arrayPos + 1];
                                                o && s === o.substr(0, t) ? (i.stopNum = t) : (i.stopNum = 0);
                                            }
                                            t > i.stopNum
                                                ? (t--, i.backspace(e, t))
                                                : t <= i.stopNum &&
                                                  (i.arrayPos++,
                                                  i.arrayPos === i.strings.length ? ((i.arrayPos = 0), i.options.onLastStringBackspaced(), i.shuffleStringsIfNeeded(), i.begin()) : i.typewrite(i.strings[i.sequence[i.arrayPos]], t));
                                        }, s);
                                    },
                                },
                                {
                                    key: "complete",
                                    value: function () {
                                        this.options.onComplete(this), this.loop ? this.curLoop++ : (this.typingComplete = !0);
                                    },
                                },
                                {
                                    key: "setPauseStatus",
                                    value: function (e, t, i) {
                                        (this.pause.typewrite = i), (this.pause.curString = e), (this.pause.curStrPos = t);
                                    },
                                },
                                {
                                    key: "toggleBlinking",
                                    value: function (e) {
                                        this.cursor &&
                                            (this.pause.status || (this.cursorBlinking !== e && ((this.cursorBlinking = e), e ? this.cursor.classList.add("typed-cursor--blink") : this.cursor.classList.remove("typed-cursor--blink"))));
                                    },
                                },
                                {
                                    key: "humanizer",
                                    value: function (e) {
                                        return Math.round((Math.random() * e) / 2) + e;
                                    },
                                },
                                {
                                    key: "shuffleStringsIfNeeded",
                                    value: function () {
                                        this.shuffle &&
                                            (this.sequence = this.sequence.sort(function () {
                                                return Math.random() - 0.5;
                                            }));
                                    },
                                },
                                {
                                    key: "initFadeOut",
                                    value: function () {
                                        var e = this;
                                        return (
                                            (this.el.className += " " + this.fadeOutClass),
                                            this.cursor && (this.cursor.className += " " + this.fadeOutClass),
                                            setTimeout(function () {
                                                e.arrayPos++, e.replaceText(""), e.strings.length > e.arrayPos ? e.typewrite(e.strings[e.sequence[e.arrayPos]], 0) : (e.typewrite(e.strings[0], 0), (e.arrayPos = 0));
                                            }, this.fadeOutDelay)
                                        );
                                    },
                                },
                                {
                                    key: "replaceText",
                                    value: function (e) {
                                        this.attr ? this.el.setAttribute(this.attr, e) : this.isInput ? (this.el.value = e) : "html" === this.contentType ? (this.el.innerHTML = e) : (this.el.textContent = e);
                                    },
                                },
                                {
                                    key: "bindFocusEvents",
                                    value: function () {
                                        var e = this;
                                        this.isInput &&
                                            (this.el.addEventListener("focus", function (t) {
                                                e.stop();
                                            }),
                                            this.el.addEventListener("blur", function (t) {
                                                (e.el.value && 0 !== e.el.value.length) || e.start();
                                            }));
                                    },
                                },
                                {
                                    key: "insertCursor",
                                    value: function () {
                                        this.showCursor &&
                                            (this.cursor ||
                                                ((this.cursor = document.createElement("span")),
                                                (this.cursor.className = "typed-cursor"),
                                                (this.cursor.innerHTML = this.cursorChar),
                                                this.el.parentNode && this.el.parentNode.insertBefore(this.cursor, this.el.nextSibling)));
                                    },
                                },
                            ]),
                            e
                        );
                    })();
                (t.default = l), (e.exports = t.default);
            },
            function (e, t, i) {
                "use strict";
                function s(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }
                Object.defineProperty(t, "__esModule", { value: !0 });
                var o =
                        Object.assign ||
                        function (e) {
                            for (var t = 1; t < arguments.length; t++) {
                                var i = arguments[t];
                                for (var s in i) Object.prototype.hasOwnProperty.call(i, s) && (e[s] = i[s]);
                            }
                            return e;
                        },
                    n = (function () {
                        function e(e, t) {
                            for (var i = 0; i < t.length; i++) {
                                var s = t[i];
                                (s.enumerable = s.enumerable || !1), (s.configurable = !0), "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
                            }
                        }
                        return function (t, i, s) {
                            return i && e(t.prototype, i), s && e(t, s), t;
                        };
                    })(),
                    r = i(2),
                    l = (function (e) {
                        return e && e.__esModule ? e : { default: e };
                    })(r),
                    a = (function () {
                        function e() {
                            s(this, e);
                        }
                        return (
                            n(e, [
                                {
                                    key: "load",
                                    value: function (e, t, i) {
                                        if (
                                            ((e.el = "string" == typeof i ? document.querySelector(i) : i),
                                            (e.options = o({}, l.default, t)),
                                            (e.isInput = "input" === e.el.tagName.toLowerCase()),
                                            (e.attr = e.options.attr),
                                            (e.bindInputFocusEvents = e.options.bindInputFocusEvents),
                                            (e.showCursor = !e.isInput && e.options.showCursor),
                                            (e.cursorChar = e.options.cursorChar),
                                            (e.cursorBlinking = !0),
                                            (e.elContent = e.attr ? e.el.getAttribute(e.attr) : e.el.textContent),
                                            (e.contentType = e.options.contentType),
                                            (e.typeSpeed = e.options.typeSpeed),
                                            (e.startDelay = e.options.startDelay),
                                            (e.backSpeed = e.options.backSpeed),
                                            (e.smartBackspace = e.options.smartBackspace),
                                            (e.backDelay = e.options.backDelay),
                                            (e.fadeOut = e.options.fadeOut),
                                            (e.fadeOutClass = e.options.fadeOutClass),
                                            (e.fadeOutDelay = e.options.fadeOutDelay),
                                            (e.isPaused = !1),
                                            (e.strings = e.options.strings.map(function (e) {
                                                return e.trim();
                                            })),
                                            "string" == typeof e.options.stringsElement ? (e.stringsElement = document.querySelector(e.options.stringsElement)) : (e.stringsElement = e.options.stringsElement),
                                            e.stringsElement)
                                        ) {
                                            (e.strings = []), (e.stringsElement.style.display = "none");
                                            var s = Array.prototype.slice.apply(e.stringsElement.children),
                                                n = s.length;
                                            if (n)
                                                for (var r = 0; r < n; r += 1) {
                                                    var a = s[r];
                                                    e.strings.push(a.innerHTML.trim());
                                                }
                                        }
                                        (e.strPos = 0),
                                            (e.arrayPos = 0),
                                            (e.stopNum = 0),
                                            (e.loop = e.options.loop),
                                            (e.loopCount = e.options.loopCount),
                                            (e.curLoop = 0),
                                            (e.shuffle = e.options.shuffle),
                                            (e.sequence = []),
                                            (e.pause = { status: !1, typewrite: !0, curString: "", curStrPos: 0 }),
                                            (e.typingComplete = !1);
                                        for (var r in e.strings) e.sequence[r] = r;
                                        (e.currentElContent = this.getCurrentElContent(e)), (e.autoInsertCss = e.options.autoInsertCss), this.appendAnimationCss(e);
                                    },
                                },
                                {
                                    key: "getCurrentElContent",
                                    value: function (e) {
                                        return e.attr ? e.el.getAttribute(e.attr) : e.isInput ? e.el.value : "html" === e.contentType ? e.el.innerHTML : e.el.textContent;
                                    },
                                },
                                {
                                    key: "appendAnimationCss",
                                    value: function (e) {
                                        if (e.autoInsertCss && (e.showCursor || e.fadeOut) && !document.querySelector("[data-typed-js-css]")) {
                                            var t = document.createElement("style");
                                            (t.type = "text/css"), t.setAttribute("data-typed-js-css", !0);
                                            var i = "";
                                            e.showCursor &&
                                                (i +=
                                                    "\n        .typed-cursor{\n          opacity: 1;\n        }\n        .typed-cursor.typed-cursor--blink{\n          animation: typedjsBlink 0.7s infinite;\n          -webkit-animation: typedjsBlink 0.7s infinite;\n                  animation: typedjsBlink 0.7s infinite;\n        }\n        @keyframes typedjsBlink{\n          50% { opacity: 0.0; }\n        }\n        @-webkit-keyframes typedjsBlink{\n          0% { opacity: 1; }\n          50% { opacity: 0.0; }\n          100% { opacity: 1; }\n        }\n      "),
                                                e.fadeOut &&
                                                    (i +=
                                                        "\n        .typed-fade-out{\n          opacity: 0;\n          transition: opacity .25s;\n        }\n        .typed-cursor.typed-cursor--blink.typed-fade-out{\n          -webkit-animation: 0;\n          animation: 0;\n        }\n      "),
                                                0 !== t.length && ((t.innerHTML = i), document.body.appendChild(t));
                                        }
                                    },
                                },
                            ]),
                            e
                        );
                    })();
                t.default = a;
                var d = new a();
                t.initializer = d;
            },
            function (e, t) {
                "use strict";
                Object.defineProperty(t, "__esModule", { value: !0 });
                var i = {
                    strings: ["These are the default values...", "You know what you should do?", "Use your own!", "Have a great day!"],
                    stringsElement: null,
                    typeSpeed: 0,
                    startDelay: 0,
                    backSpeed: 0,
                    smartBackspace: !0,
                    shuffle: !1,
                    backDelay: 700,
                    fadeOut: !1,
                    fadeOutClass: "typed-fade-out",
                    fadeOutDelay: 500,
                    loop: !1,
                    loopCount: 1 / 0,
                    showCursor: !0,
                    cursorChar: "|",
                    autoInsertCss: !0,
                    attr: null,
                    bindInputFocusEvents: !1,
                    contentType: "html",
                    onComplete: function (e) {},
                    preStringTyped: function (e, t) {},
                    onStringTyped: function (e, t) {},
                    onLastStringBackspaced: function (e) {},
                    onTypingPaused: function (e, t) {},
                    onTypingResumed: function (e, t) {},
                    onReset: function (e) {},
                    onStop: function (e, t) {},
                    onStart: function (e, t) {},
                    onDestroy: function (e) {},
                };
                (t.default = i), (e.exports = t.default);
            },
            function (e, t) {
                "use strict";
                function i(e, t) {
                    if (!(e instanceof t)) throw new TypeError("Cannot call a class as a function");
                }
                Object.defineProperty(t, "__esModule", { value: !0 });
                var s = (function () {
                        function e(e, t) {
                            for (var i = 0; i < t.length; i++) {
                                var s = t[i];
                                (s.enumerable = s.enumerable || !1), (s.configurable = !0), "value" in s && (s.writable = !0), Object.defineProperty(e, s.key, s);
                            }
                        }
                        return function (t, i, s) {
                            return i && e(t.prototype, i), s && e(t, s), t;
                        };
                    })(),
                    o = (function () {
                        function e() {
                            i(this, e);
                        }
                        return (
                            s(e, [
                                {
                                    key: "typeHtmlChars",
                                    value: function (e, t, i) {
                                        if ("html" !== i.contentType) return t;
                                        var s = e.substr(t).charAt(0);
                                        if ("<" === s || "&" === s) {
                                            var o = "";
                                            for (o = "<" === s ? ">" : ";"; e.substr(t + 1).charAt(0) !== o && !(++t + 1 > e.length); );
                                            t++;
                                        }
                                        return t;
                                    },
                                },
                                {
                                    key: "backSpaceHtmlChars",
                                    value: function (e, t, i) {
                                        if ("html" !== i.contentType) return t;
                                        var s = e.substr(t).charAt(0);
                                        if (">" === s || ";" === s) {
                                            var o = "";
                                            for (o = ">" === s ? "<" : "&"; e.substr(t - 1).charAt(0) !== o && !(--t < 0); );
                                            t--;
                                        }
                                        return t;
                                    },
                                },
                            ]),
                            e
                        );
                    })();
                t.default = o;
                var n = new o();
                t.htmlParser = n;
            },
        ]);
    });
