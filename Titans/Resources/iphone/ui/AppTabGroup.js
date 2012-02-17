function AppTabGroup() {
	//load dependencies
	var _ = require('/lib/underscore'),
		ui = require('/ui/components'),
		LogoWindow = require('/ui/LogoWindow'),
		StreamView = require('/ui/StreamView'),
		GroupsView = require('/ui/GroupsView'),
		LeadersView = require('/ui/LeadersView'),
		EventsView = require('/ui/EventsView');
	
	//create base proxy object and component wrapper
	var self = new ui.TabGroup();
	
	//Stream tab
	var streamWindow = new LogoWindow(),
		streamView = new StreamView();
	
	streamWindow.add(streamView);
	
	var streamTab = Ti.UI.createTab({
		title:'Stream',
		icon:'/images/tabs/chat.png',
		window:streamWindow
	});
	self.addTab(streamTab);
	
	//Groups tab
	var groupsWindow = new LogoWindow(),
		groupsView = new GroupsView();
	
	groupsWindow.add(groupsView);
	
	var groupsTab = Ti.UI.createTab({
		title:'Groups',
		icon:'/images/tabs/group.png',
		window:groupsWindow
	});
	self.addTab(groupsTab);
	
	//Events tab
	var eventsWindow = new LogoWindow(),
		eventsView = new EventsView();
	
	eventsWindow.add(eventsView);
	
	var eventsTab = Ti.UI.createTab({
		title:'Events',
		icon:'/images/tabs/calendar.png',
		window:eventsWindow
	});
	self.addTab(eventsTab);
	
	//Leaders tab
	var leadersWindow = new LogoWindow(),
		leadersView = new LeadersView();
	
	leadersWindow.add(leadersView);
	
	var leadersTab = Ti.UI.createTab({
		title:'Leaders',
		icon:'/images/tabs/badge.png',
		window:leadersWindow
	});
	self.addTab(leadersTab);
	
	return self;
}

module.exports = AppTabGroup;