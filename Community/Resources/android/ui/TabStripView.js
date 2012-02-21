var _ = require('/lib/underscore'),
	ui = require('/ui/components'),
	theme = require('/ui/theme');

function tabWidth() {
	return Ti.Platform.displayCaps.platformWidth / 4;
}

function TabButton(id, text, icon, selected) {	
	var self = new ui.Component(Ti.UI.createView({
		width:tabWidth(),
		opacity:0.8,
		backgroundColor:(isSelected) ? '#444444' : 'transparent'
	}));
	self.id = id;
	self.selected = selected;
	
	self.add(new ui.ImageView(icon,{
		top:6,
		height:25
	}));
	
	self.add(new ui.Label(text,{
		text:text,
		color:'#fff',
		bottom:3,
		font: {
			fontSize:10
		}
	}));
	
	Ti.Gesture.addEventListener('orientationchange', function() {
		self.viewProxy.width = tabWidth();
	});
	
	self.toggle = function(b) {
		self.selected = b;
		self.set('backgroundColor', (self.selected) ? '#444444' : 'transparent');
		self.fireEvent('statusChange', {selected:self.selected});
	};
	
	self.addEventListener('click', function() {
		self.toggle(true);
	});
	
	return self;
}

function TabStripView(args) {
	var self = new ui.Component(Ti.UI.createView(_.extend({
		height:50,
		layout:'horizontal',
		backgroundColor:'#121212'
	}, args.viewArgs||{}))); 
	
	//create and add tabs
	var tabObjects = [],
		tabInfo = [{
		title:L('updates', 'Stream'),
		icon:'/images/tabs/chat_white.png',
		id:'stream'
	},{
		title:L('groups', 'Groups'),
		icon:'/images/tabs/group_white.png',
		id:'groups'
	},{
		title:L('events', 'Events'),
		icon:'/images/tabs/calendar_white.png',
		id:'events'
	},{
		title:L('leaders', 'Leaders'),
		icon:'/images/tabs/badge_white.png',
		id:'leaders'
	}];
	
	_.each(tabInfo, function(obj) {
		var tab = new TabButton(obj.id, obj.title, obj.icon, obj.id === 'stream');
		self.add(tab);
		tabObjects.push(tab);
		
		tab.addEventListener('statusChange', function(e) {
			var selectedIndex;
			for (var i = 0, l = tabObjects.length; i<l; i++) {
				tabObjects[i].toggle();
				if (tabObjects[i].selected) {
					selectedIndex = i;
				}
			}
			
			//bubble up selected index
			self.fireEvent('selected', {index:selectedIndex});
		});
	});
	
	//this sucks, need to do this more intelligently
	self.selectIndex = function(index, bubble) {
		for (var i = 0, l = tabObjects.length; i<l; i++) {
			tabObjects[i].toggle();
			if (tabObjects[i].selected) {
				selectedIndex = i;
			}
		}
		//bubble up selected index
		if (bubble) {
			self.fireEvent('selected', {index:index});
		}
	};
	
	return self;
}

module.exports = TabStripView;