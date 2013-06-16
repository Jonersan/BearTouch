enchant();
window.onload = function() {
    var game = new Game(320, 320);
    game.enemy_speed = 1;
    game.preload('chara1.png', 'map0.png');
    game.score = 0;
    game.time = 180;


    var Bear = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 32, 32);
            this.x = x;
            this.y = y;
            this.image = game.assets['chara1.png'];
            this.frame = 5;
            game.rootScene.addChild(this);
        }
    });

    var Enemy = enchant.Class.create(Bear, {
        initialize: function(x, y) {
            Bear.call(this, x, y);
            this.addEventListener('enterframe', function() {
                this.x += game.enemy_speed;
                this.frame = [0, 1, 0, 2][Math.floor(this.age/5) % 4] + 5;
                if(this.x >= 320) {
                    game.end(game.sore, "Game Over");
                }
            });
        },
        ontouchstart: function() {
            game.rootScene.removeChild(this);
            game.score += 1;
        }

    });

    var Treasure = enchant.Class.create(enchant.Sprite, {
        initialize: function(x, y) {
            enchant.Sprite.call(this, 16, 16);
            this.x = x;
            this.y = y;
            this.image = game.assets['map0.png'];
            this.frame = 0;
            game.rootScene.addChild(this);
        }
    });

    game.onload = function() {
        var score = new Label();
        score.x = 2; score.y = 16;
        score.text = "Score: " + 100;
        score.addEventListener(enchant.Event.ENTER_FRAME, function() {
            this.text = "Score: " + game.score;
        });
        game.rootScene.addChild(score);

        game.rootScene.addEventListener('enterframe', function() {
            if((this.age % Math.ceil(game.time / 10)) == 0){
                var enemy = new Enemy(0, rand(320));
            }
            if(game.frame % game.fps == 0){
                game.time--;
            }
        });
    };

    game.start();
};

function rand(num){ return Math.floor(Math.random() * num) };