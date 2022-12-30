(function() {
  var template = Handlebars.template, templates = Handlebars.templates = Handlebars.templates || {};
templates['siteContainer'] = template({"1":function(container,depth0,helpers,partials,data) {
    var stack1, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "        <form action='' id='select-channel-displayed'>\n\n          <select id='list' name='get-channel' size='7'>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(depth0 != null ? depth0 : (container.nullContext || {}),(depth0 != null ? lookupProperty(depth0,"channelsData") : depth0),{"name":"each","hash":{},"fn":container.program(2, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":39,"column":12},"end":{"line":42,"column":21}}})) != null ? stack1 : "")
    + "          </select>\n          <button type='submit' style='display: none;'></button>\n        </form>\n";
},"2":function(container,depth0,helpers,partials,data) {
    var helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "\n              <option value='"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":41,"column":29},"end":{"line":41,"column":44}}}) : helper)))
    + "'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":41,"column":46},"end":{"line":41,"column":61}}}) : helper)))
    + "</option>\n";
},"4":function(container,depth0,helpers,partials,data) {
    return "        <p class='no-channels'>\n          No Channels Available Yet\n        </p>\n\n";
},"6":function(container,depth0,helpers,partials,data) {
    return "          <li>"
    + container.escapeExpression(container.lambda(depth0, depth0))
    + "</li>\n";
},"compiler":[8,">= 4.3.0"],"main":function(container,depth0,helpers,partials,data) {
    var stack1, helper, alias1=depth0 != null ? depth0 : (container.nullContext || {}), alias2=container.hooks.helperMissing, alias3="function", alias4=container.escapeExpression, lookupProperty = container.lookupProperty || function(parent, propertyName) {
        if (Object.prototype.hasOwnProperty.call(parent, propertyName)) {
          return parent[propertyName];
        }
        return undefined
    };

  return "<div id='nav-menu-container'>\n  <div class='nav-menu-hide' id='nav-hamburger'></div>\n</div>\n<div class='group-info-btn-container'>\n  <div class='group-info-btn-hide' id='group-btn'>\n  </div>\n</div>\n<header id='header'>\n  <h2>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":9,"column":6},"end":{"line":9,"column":21}}}) : helper)))
    + "</h2>\n  <div id='toggles'>\n    <div class='toggle-container'>\n      <p id='toggle-label'>Show channel info</p>\n      <div class='toggle switch-off'>\n        <span class='toggle-switch off'></span>\n      </div>\n    </div>\n  </div>\n</header>\n<main id='main'>\n  <div class='text-container'>\n    <div></div>\n  </div>\n</main>\n<nav id='nav'>\n  <div class='member-channels'>\n    <div id='list-and-choose'>\n      <h2>Channels <i class='fa fa-caret-down' aria-hidden='true'></i></h2>\n"
    + ((stack1 = lookupProperty(helpers,"if").call(alias1,(depth0 != null ? lookupProperty(depth0,"channelsData") : depth0),{"name":"if","hash":{},"fn":container.program(1, data, 0),"inverse":container.program(4, data, 0),"data":data,"loc":{"start":{"line":28,"column":6},"end":{"line":51,"column":13}}})) != null ? stack1 : "")
    + "    </div>\n  </div>\n  <div id='join-create'>\n    <button id='nav-create-channel'><i\n        class='fa fa-plus'\n        aria-hidden='true'\n      ></i>\n      Create Channel</button>\n    <button id='nav-join-channel'><i class='fas fa-user-friends'></i>\n      Join Channel</button>\n    <!-- <button> <i class=\"fas fa-user-edit    \"></i>  My Profile</button> -->\n  </div>\n  <!-- <div class=\"notifications\"></div> -->\n</nav>\n<aside id='aside' class='aside-hide'>\n  <!--h1 class=\"channel-info-head\">Channel Information</h1-->\n  <h1 class='channel-info-head'>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelName") || (depth0 != null ? lookupProperty(depth0,"channelName") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelName","hash":{},"data":data,"loc":{"start":{"line":68,"column":32},"end":{"line":68,"column":47}}}) : helper)))
    + "</h1>\n\n  <div class='channel-info-container'>\n    <div class='channel-avatar'>\n      <i class='fas fa-user-friends'></i>\n    </div>\n    <div class='channel-topic-description'>\n      <div class='topic-info'><p><b>Topic:\n          </b>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelTopic") || (depth0 != null ? lookupProperty(depth0,"channelTopic") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelTopic","hash":{},"data":data,"loc":{"start":{"line":78,"column":14},"end":{"line":78,"column":30}}}) : helper)))
    + "</p></div>\n      <div class='description-info'><p><b>Description:\n          </b>"
    + alias4(((helper = (helper = lookupProperty(helpers,"channelDescription") || (depth0 != null ? lookupProperty(depth0,"channelDescription") : depth0)) != null ? helper : alias2),(typeof helper === alias3 ? helper.call(alias1,{"name":"channelDescription","hash":{},"data":data,"loc":{"start":{"line":80,"column":14},"end":{"line":80,"column":36}}}) : helper)))
    + "</p></div>\n\n    </div>\n    <h1 class='members-head'>Members</h1>\n    <div class='channel-members'>\n      <ul class='members-info'>\n"
    + ((stack1 = lookupProperty(helpers,"each").call(alias1,(depth0 != null ? lookupProperty(depth0,"channelMembers") : depth0),{"name":"each","hash":{},"fn":container.program(6, data, 0),"inverse":container.noop,"data":data,"loc":{"start":{"line":86,"column":8},"end":{"line":88,"column":17}}})) != null ? stack1 : "")
    + "\n      </ul>\n    </div>\n  </div>\n</aside>\n<footer id='footer'>\n  <form action='' id='text-form' class='card'>\n    <div class='form-row'>\n      <div id='textbox' contenteditable='true' role='textbox'></div>\n      <button type='submit' id='send-button'>Send</button>\n    </div>\n  </form>\n</footer>";
},"useData":true});
})();