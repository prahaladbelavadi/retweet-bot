/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = 'pKzJMtjwptSoxchmr2PPGYzUQ';
var TWITTER_CONSUMER_SECRET = 'GXV0gb09AiyH0k3YlKx9OsGl0IHPUTl3iX1VGFSfvkVRg86VoX';
var TWITTER_ACCESS_TOKEN = '843928268935856128-f9G2AoHPc5VgXiztQczBVzpGRORtg9g';
var TWITTER_ACCESS_TOKEN_SECRET = '1mT2z5a6zJWvbw94wltX3V2vTtER6LzXm6iGyusmUwvDf';

/* Set Twitter search phrase */
var TWITTER_SEARCH_PHRASE = '#savoyy';

var Twit = require('twit');

var Bot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN,
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log('The bot is running...');

/* BotRetweet() : To retweet the matching recent tweet */
function BotRetweet() {

	var query = {
		q: TWITTER_SEARCH_PHRASE,
		result_type: "recent"
	}

	Bot.get('search/tweets', query, BotGotLatestTweet);

	function BotGotLatestTweet (error, data, response) {
		if (error) {
			console.log('Bot could not find latest tweet, : ' + error);
		}
		else {
			var id = {
				id : data.statuses[0].id_str
			}

			Bot.post('statuses/retweet/:id', id, BotRetweeted);

			function BotRetweeted(error, response) {
				if (error) {
					console.log('Bot could not retweet, : ' + error);
				}
				else {
					console.log('Bot retweeted : ' + id.id);
				}
			}
		}
	}

	/* Set an interval of 30 minutes (in microsecondes) */
	setInterval(BotRetweet, 30*60*1000);
}

/* Initiate the Bot */
// BotInit();
BotRetweet();
// BotRetweeted();
