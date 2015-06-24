var cssCallButton = '#webcallCloseButton:hover,#webcallHeader:hover{cursor:pointer}#webcallComponent{top:150px!important;right:0;background:#0094d6!important;padding:10px;max-height:40px;color:#fff!important;text-align:center!important;transition-duration:.3s!important;-webkit-border-radius:2px 0 0 2px;-moz-border-radius:2px 0 0 2px;border-radius:2px 0 0 2px!important;line-height:20px!important;box-shadow:0 0 10px rgba(0,0,0,.5)!important;white-space:nowrap!important;z-index:10000!important}#webcallComponent,#webcallPanel{position:fixed!important;-webkit-transition-duration:.3s;-moz-transition-duration:.3s;-o-transition-duration:.3s}#webcallPanel{top:0;right:-400px;width:400px!important;height:100%!important;padding:0;transition-duration:.3s;box-shadow:0 0 10px rgba(0,0,0,.1)}#webcallComponent.open{right:400px}#webcallPanel.open{right:0}#webcallIcon{float:left;max-height:20px;max-width:20px;margin:0 5px 0 0}#webcallHeader{list-style-type:none;margin-left:0;padding-left:0;display:inline-block}#webcallText{text-align:right;display:inline-block;padding:0;margin:0 10px 0 0;font-family:sans-serif;font-size:16px!important;color:#fff!important}.animated{-webkit-animation-duration:2s;animation-duration:2s;-webkit-animation-iteration-count:3;animation-iteration-count:3;-webkit-animation-name:flash;animation-name:flash}#webcallCloseButton{position:absolute!important;top:10px!important;right:10px!important;background:#26a69a!important;padding:5px;z-index:10;font-family:Roboto,sans-serif;font-size:10px}';
var callButton = function (key, settings) {
    var options = {};
    var width = '400px';

    if (!settings) var settings = {};

    var initOptions = function () {
        options.title = settings.title || 'Перезвонить Вам?';
        options.key = key;
        options.backgroundColor = settings.backgroundColor || '#0094d6';
        options.titleColor = settings.titleColor || '#FFFFFF';
        options.top = settings.top || '150px';
        options.icon = settings.icon || false;
        options.iconAnimated = settings.iconAnimated || false;
        options.intrusiveMode = settings.intrusiveMode || false;
        options.intrusiveTimeout = parseInt(settings.intrusiveTimeout + '000') || 30000;
        options.closeButtonTitle = settings.closeButtonTitle || 'закрыть';
    }();

    var browser = (function () {
        var ua = navigator.userAgent, tem,
            M = ua.match(/(opera|chrome|safari|firefox|msie|trident(?=\/))\/?\s*(\d+)/i) || [];

        if (/trident/i.test(M[1])) {
            tem =  /\brv[ :]+(\d+)/g.exec(ua) || [];
            return 'IE '+(tem[1] || '');
        }

        if (M[1] === 'Chrome') {
            tem = ua.match(/\b(OPR|Edge)\/(\d+)/);
            if(tem != null) return tem.slice(1).join(' ').replace('OPR', 'Opera');
        }

        M = M[2] ? [M[1], M[2]] : [navigator.appName, navigator.appVersion, '-?'];

        if((tem = ua.match(/version\/(\d+)/i)) != null) M.splice(1, 1, tem[1]);

        return {'browser': M[0], 'version': M[1]};
    })();

    var browserTrusted = function () {
        return browser.browser === 'Chrome' || browser.browser === 'Firefox';
    };

    var sheet = (function () {
        var style = document.createElement("style");
        style.setAttribute('type', 'text/css');

        style.appendChild(document.createTextNode(cssCallButton));
        document.head.appendChild(style);

        return style.sheet;
    })();

    var Layout = function () {
        var component = document.createElement("div");
        component.setAttribute("id", "webcallComponent");
        component.setAttribute("style", [
            'top: ' + options.top + ' !important;',
            'background: ' + options.backgroundColor + ' !important;'
            ].join(" "));

        var panel = document.createElement("div");
        panel.setAttribute("id", "webcallPanel");

        var iframe = document.createElement("iframe");        
        var url = 'http://call.mobilon.ru/' + options.key + '/remote2';

        iframe.setAttribute('src', url);
        iframe.setAttribute('height', '100%');
        iframe.setAttribute('width', '100%');
        iframe.setAttribute('frameborder', '0');
        iframe.setAttribute('allowtransparency', 'true');
        iframe.setAttribute('style', 'position:relative; top:0px; left:0px;');

        panel.appendChild(iframe);

        var closeButton = document.createElement("div");
        closeButton.setAttribute("id", "webcallCloseButton");
        closeButton.innerHTML = "<b>" + options.closeButtonTitle + "</b>"

        panel.appendChild(closeButton);


        var header = document.createElement("div");
        header.setAttribute("id", "webcallHeader");

        var text = document.createElement("div");
        text.setAttribute("id", "webcallText");
        text.setAttribute("style", [           
            'color: ' + options.titleColor + ' !important;',
            ].join(" "));
        
        text.textContent = options.title;
        header.appendChild(text);

        if (options.icon && browserTrusted()) {

            var icon = document.createElement("img");
            var iconSvg = '<svg width="24" height="24" xmlns="http://www.w3.org/2000/svg"><g><path clip-rule="evenodd" d="m6.47719,1.62291c1.21752,-0.22999 2.01542,1.14288 2.62266,2.09006c0.59111,0.91995 1.31839,1.99927 1.02485,3.19662c-0.16341,0.67181 -0.77066,1.03797 -1.22963,1.43439c-0.45291,0.39138 -1.14288,0.75048 -1.31032,1.35168c-0.27336,0.97543 0.32481,1.99927 0.69501,2.58231c0.84126,1.31738 1.85805,2.50464 3.15627,3.5648c0.62843,0.51445 1.50097,1.20138 2.37553,1.02485c1.30629,-0.26428 1.65127,-1.8752 3.07355,-2.09006c1.35369,-0.20477 2.26961,0.77671 3.03421,1.4344c0.73636,0.6365 1.92463,1.45154 1.84393,2.54196c-0.04741,0.62641 -0.54975,1.01477 -0.98552,1.39304c-0.44283,0.38634 -0.83118,0.82009 -1.26896,1.10555c-1.06016,0.69198 -2.36039,1.03091 -3.85329,0.98451c-1.46364,-0.04539 -2.62972,-0.54269 -3.68786,-1.10656c-2.06888,-1.10354 -3.704,-2.65595 -5.24431,-4.3859c-1.51509,-1.7007 -2.91418,-3.71409 -3.68786,-5.94032c-0.96534,-2.78002 -0.45493,-5.63569 1.10757,-7.41708c0.26428,-0.30261 0.68189,-0.61834 1.06419,-0.94315c0.38129,-0.32582 0.73434,-0.72022 1.26997,-0.82109z" fill="' + options.titleColor + '" fill-rule="evenodd"/></g></svg>';
            var iconEncoded = encodeURIComponent(iconSvg);
            icon.setAttribute('src', 'data:image/svg+xml;utf8,' + iconEncoded);
            icon.setAttribute('id', 'webcallIcon');


            if (options.iconAnimated) {
                var cssAnimationRules = {
                    webkit: [
                        ['@-webkit-keyframes flash {',
                            '0%, 50%, 100% { opacity: 1; }',
                            '25%, 75% { opacity: 0; }',
                        '}'].join(" ")
                    ],
                    other: [
                        ['@keyframes flash {',
                            '0%, 50%, 100% { opacity: 1; }',
                            '25%, 75% { opacity: 0; }',
                        '}'].join(" ")
                    ]
                };

                var animation;
                if (CSSRule.WEBKIT_KEYFRAMES_RULE) {
                    animation = cssAnimationRules.webkit;
                } else {
                    animation = cssAnimationRules.other;
                }

                animation.map(function (rule) {
                    sheet.insertRule(rule, 0);
                });

                icon.setAttribute('class', 'animated');
            }

            header.insertBefore(icon, header.firstChild);
        }

        component.appendChild(header);
        component.appendChild(panel);        

        document.body.appendChild(component);

    }();

    var helper = {
        toggleClass: function (element, className) {
            if (element.classList) {
              element.classList.toggle(className);
            } else {
                var classes = element.className.split(' ');
                var existingIndex = -1;
                for (var i = classes.length; i--;) {
                  if (classes[i] === className)
                    existingIndex = i;
                }
                if (existingIndex >= 0)
                  classes.splice(existingIndex, 1);
                else
                  classes.push(className);
              element.className = classes.join(' ');
            }
        },
        addClass: function (element, className) {
            if (element.classList)
              element.classList.add(className);
            else
              element.className += ' ' + className;
        },
        removeClass: function (element, className) {
            if (element.classList)
              element.classList.remove(className);
            else
              element.className = element.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
        },
        hasClass: function (element, className) {
            if (element.classList)
              return element.classList.contains(className);
            else
              return  new RegExp('(^| )' + className + '( |$)', 'gi').test(element.className);
        }
    };

    var addClickAction = function () {
        var button = document.getElementById("webcallComponent");
        var panel = document.getElementById("webcallPanel");

        button.addEventListener("click", function () {
            helper.toggleClass(button, 'open');
            helper.toggleClass(panel, 'open');
        });

    }();

    var addClickOnBodyAction = function () {
        document.addEventListener('click', function (e) {
            var panel = document.getElementById("webcallPanel");
            var button = document.getElementById("webcallComponent");
            var text = document.getElementById("webcallText")
            if (helper.hasClass(button, 'open') && !(
                e.target === text ||
                e.target === button)
            ) {
                helper.toggleClass(button, 'open');
                helper.toggleClass(panel, 'open');
                e.stopPropagation()
            }
        });
    }();
    
    var enableIntrusiveMode = function () {
        if (options.intrusiveMode) {
            setTimeout(function () {
                var button = document.getElementById("webcallComponent");
                var panel = document.getElementById("webcallPanel");

                if (!helper.hasClass(button, 'open')){
                    helper.addClass(button, 'open');
                    helper.addClass(panel, 'open');
                };

            }, options.intrusiveTimeout);
        }
    }();
};
document.addEventListener("DOMContentLoaded", function (event) {
    callButton("nta2gh6hpp", {
        title: "Перезвонить Вам?",
        titleColor: "#FFFFFF",
        backgroundColor: "#0094d6",
        top: "150px",
        icon: false,
        iconAnimated: false,
        intrusiveMode: false,
        intrusiveTimeout: 30
    });
});