App = Ember.Application.create();

App.Router.map(function() {
	this.resource('about');
	
	// using standard routes
	// this.resource('posts');
	// this.resource('post', {path: ':post_id'});	
	
	// using child routes
	this.resource('posts', function() {
		this.resource('post', {path: ':post_id'});
	});	
});

App.PostsRoute = Ember.Route.extend({
	model: function() {
		// uncomment this to use hard-coded instead of getting data externally
		// return posts;
		
		return $.getJSON('http://tomdale.net/api/get_recent_posts/?callback=?').then(function(data) {
			return data.posts.map(function(post) {
				post.body = post.content;
				return post;
			});
		});
	}
});

App.PostRoute = Ember.Route.extend({
	model: function(params) {
		// uncomment this to use hard-coded instead of getting data externally
		// return posts.findBy('id', params.post_id);
		
		return $.getJSON('http://tomdale.net/api/get_post/?id=' + params.post_id + '&callback=?').then(function(data) {
			data.post.body = data.post.content;
			return data.post;
		});
	}
});

App.PostController = Ember.ObjectController.extend({
	isEditing: false,
	
	actions: {
		edit: function() {
			this.set('isEditing', true);
		},
		
		doneEditing: function() {
			this.set('isEditing', false);
		}
	}
});

Ember.Handlebars.helper('format-date', function(date) {
	return moment(date).fromNow();
});

var showdown = new Showdown.converter();

Ember.Handlebars.helper('format-markdown', function(input) {
	return new Handlebars.SafeString(showdown.makeHtml(input));
});

// uncomment this to use hard-coded instead of getting data externally
// var posts = [
// 	{
// 		id: '1',
// 		title: 'number 1',
// 		date: new Date('11-22-2013'),
// 		excerpt: '**Bacon ipsum dolor sit amet tenderloin turkey biltong sirloin salami jowl frankfurter venison drumstick pancetta shank sausage ham ground round.**'
// 	},
// 	{
// 		id: '2',
// 		title: 'number 2',
// 		date: new Date('11-23-2013'),
// 		excerpt: '**Tractor beam Mos Eisley lightsaber thermal detonator more powerful than you can possibly imagine soon you will call me master.**'
// 	},
// 	{
// 		id: '3',
// 		title: 'number 3',
// 		date: new Date('11-24-2013'),
// 		excerpt: '**biltong sirloin salami jowl.**'
// 	},
// 	{
// 		id: '4',
// 		title: 'number 4',
// 		date: new Date('11-25-2013'),
// 		excerpt: '**more powerful than you can possibly imagine.**'
// 	}	
// 	
// ]
