/*
 * show-backlinks.js
 * https://github.com/savetheinternet/Tinyboard/blob/master/js/show-backlinks.js
 *
 * Released under the MIT license
 * Copyright (c) 2012 Michael Save <savetheinternet@tinyboard.org>
 *
 * Usage:
 *   $config['additional_javascript'][] = 'js/jquery.min.js';
 *   // $config['additional_javascript'][] = 'js/post-hover'; (optional; must come first)
 *   $config['additional_javascript'][] = 'js/show-backlinks.js';
 *
 */

onready(function(){
	if (settings.showBackLinks) {
		var showBackLinks = function() {
			var reply_id = $(this).attr('id').replace(/^reply_/, '');
			
			$(this).find('div.body a:not([rel="nofollow"])').each(function() {
				var id, post, $mentioned;
			
				if(id = $(this).text().match(/^>>(\d+)$/))
					id = id[1];
				else
					return;
			
				$post = $('#reply_' + id);
				if($post.length == 0)
					return;
			
				if (settings.backLinksStyle) {
					$mentioned = $post.find('p.intro span.mentioned');
					if($mentioned.length == 0)
						$mentioned = $('<span class="mentioned unimportant"></span>').appendTo($post.find('p.intro'));
					} else {
						$mentioned = $post.find('div.body span.mentioned');
						if($mentioned.length == 0)
							$mentioned = $('<span class="mentioned unimportant" style="display: block;	margin-top: 10px">Ответы: </span>').appendTo($post.find('div.body'));
						}
				if ($mentioned.find('a.mentioned-' + reply_id).length != 0)
					return;
				
				var $link = $('<a class="mentioned-' + reply_id + '" onclick="highlightReply(\'' + reply_id + '\');" href="#' + reply_id + '">&gt;&gt;' +
					reply_id + '</a>');
				$link.appendTo($mentioned)
				
				if (window.init_hover) {
					$link.each(init_hover);
				}
			});
		};
		
		$('div.post.reply').each(showBackLinks);

			$(document).bind('new_post', function(e, post) {
			if ($(post).hasClass("reply")) {
				showBackLinks.call(post);
			}
			else {
				$(post).find('div.post.reply').each(showBackLinks);
			}
		});
	}
});
