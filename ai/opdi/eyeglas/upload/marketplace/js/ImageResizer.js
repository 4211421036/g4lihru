var ImageResizer=function(){var e,t,n,i,r,a,u,h,d,o,c=!1,s=function(e){return"IMG"===e.tagName?e.naturalWidth:e.width},w=function(e){return"IMG"===e.tagName?e.naturalHeight:e.height},g=function(e,t,n){var i=(n+1)%2,u=r[n],h=r[i],d=a[i];return u.width/e>2?(h.width=Math.round(u.width/2),h.height=Math.round(u.height/2),d.drawImage(u,0,0,h.width,h.height),g(e,t,i)):(h.width=e,h.height=Math.round(e*t),d.drawImage(u,0,0,h.width,h.height),h)},m=function(e){return g(e,r[0].height/r[0].width,0)},f=function(e,t){r[t].width=s(e),r[t].height=w(e),a[t].drawImage(e,0,0)},_={init:function(){c=!0,e=document.createElement("canvas"),t=e.getContext("2d"),n=document.createElement("canvas"),i=n.getContext("2d"),u=document.createElement("canvas"),d=u.getContext("2d"),h=document.createElement("canvas"),o=h.getContext("2d"),r=[e,n],a=[t,i]},set_tainted:function(){c||_.init(),r[0]=u,r[1]=h,a[0]=d,a[1]=o},unset_tainted:function(){r[0]=e,r[1]=n,a[0]=t,a[1]=i},clone:function(e){var t=document.createElement("canvas");return t.width=e.width,t.height=e.height,t.getContext("2d").drawImage(e,0,0),t},resize_andCrop:function(e,t,n){c||_.init();var i,u,h,d,o=t/n;return s(e)/w(e)>o?(u=0,d=w(e),h=Math.round(d*o),i=Math.round((s(e)-h)/2)):(i=0,h=s(e),d=Math.round(h/o),u=Math.round((w(e)-d)/2)),r[0].width=h,r[0].height=d,a[0].drawImage(e,i,u,h,d,0,0,h,d),m(t)},resize_andCropNew:function(e,t,n){return c||_.init(),_.clone(_.resize_andCrop(e,t,n))},resize_width:function(e,t){return c||_.init(),f(e,0),m(t)},resize_widthNew:function(e,t){return c||_.init(),_.clone(_.resize_width(e,t))},resize_maxDim:function(e,t){c||_.init();var n=t;return w(e)>s(e)&&(n=Math.round(s(e)*t/w(e))),f(e,0),m(n)},resize_maxDimNew:function(e,t){return c||_.init(),_.clone(_.resize_maxDim(e,t))},resize_squareIfLandscape:function(e,t){return w(n=e)>s(n)?_.resize_width(e,t):_.resize_square(e,t);var n},resize_squareIfLandscapeNew:function(e,t){return c||_.init(),_.clone(_.resize_squareIfLandscape(e,t))},resize_square:function(e,t){var n,i,u;return c||_.init(),s(e)>w(e)?(i=0,n=Math.round((s(e)-w(e))/2),u=w(e)):(n=0,i=Math.round((w(e)-s(e))/2),u=s(e)),r[0].width=u,r[0].height=u,a[0].drawImage(e,n,i,u,u,0,0,u,u),m(t)},resize_squareNew:function(e,t){return c||_.init(),_.clone(_.resize_square(e,t))}};return _}();