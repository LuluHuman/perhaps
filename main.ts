scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile`, function (sprite, location) {
    tiles.setTileAt(location, assets.tile`transparency16`)
    info.changeScoreBy(1)
    if (info.score() == 5) {
        Level += 1
        myEnemy.destroy()
        newGame()
    } else if (info.score() == 10) {
        Level += 1
        myEnemy.destroy()
        newGame()
    } else if (info.score() == 15) {
        Level += 1
        myEnemy.destroy()
        newGame()
    }
})
info.onCountdownEnd(function () {
    if (Level == 0) {
        myEnemy = sprites.create(img`
            88888888888888888888888888888888
            88888888888888888888888888888888
            88888888888888888888888888884488
            88888888888888888888888888444448
            88888888888888888888888844444444
            88888888888888888888888444444444
            88888888888888888888844444444444
            88888888888888888888444444444444
            88888888888888888888888444448888
            88888888888888888888884444448888
            88888888888888888888844444488888
            88888888888888888888844444888888
            88888888888888888888444448888888
            88888888888888888884444488888888
            8888ddd8888888888844444888888888
            888ddddd888888888444448888888888
            8dffddffd88888884444488888888888
            ddddddddd88888888888888888888888
            ddfdddfdd88888888888888888888888
            8ddfffdd888811888888811888888888
            8ddddddd888188188188188181888888
            8fddddff888188881118188181118888
            fff181ff888811888188188181881811
            fff888fff88888188188188181881888
            fffffffff88188188188188181881888
            fffffffff88811888188811881881888
            fffffffff88888888888888888888888
            fffffffff88818818811118888888888
            ffffffffff8818188818888888888888
            ffffffffff8811188811118888888888
            8fffffffff8818818888818888888888
            888ffffff88818818811118888888888
            `, SpriteKind.Enemy)
        myEnemy.setScale(0.469, ScaleAnchor.Middle)
        myEnemy.follow(mySprite, 50)
    } else if (Level == 1) {
        myEnemy = sprites.create(img`
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . . . . . . . . . . . 
            . . . . . . f f . . . . . . . . 
            . . . . . d d d d . . . . . . . 
            . . . . d f d d f d . . . . . . 
            . . . . d d d d d d . . . . . . 
            . . . . . d f f d . . . . . . . 
            . . . . . . . d . . . . . . . . 
            . . . . . d d d d . . . . . . . 
            . . . . d d d d d d . . . . . . 
            . . 7 7 7 d d d d 7 7 . . . . . 
            . 7 7 7 7 7 7 7 7 7 7 7 . . . . 
            7 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
            7 7 7 7 7 7 7 7 7 7 7 7 7 . . . 
            `, SpriteKind.Enemy)
    } else if (Level == 2) {
        myEnemy.follow(mySprite, 40)
        myEnemy = sprites.create(img`
            1 1 1 1 1 1 1 e e e e e e e e e 
            1 1 1 1 1 1 e e e e e e e e e e 
            1 1 1 1 1 e e e e e e e e e e e 
            1 1 1 1 e f f e e e e f f e e e 
            1 1 1 e e f f e e e e f f e e e 
            1 1 e e e e e e e e e e e e e e 
            1 e e e e e b e e e e b e e e e 
            e e e e e e b b e e b b e e e e 
            e e e e e e e b b b b e e e e e 
            e e e e e e e e e e e e e e e e 
            f e f e e f e e f f e f f e f f 
            f f f e f f f e f e f e f e f f 
            f 1 f e f e f e f e f e f e f e 
            1 1 1 e e e f e e f e f e f f e 
            1 1 1 1 e f f f e f f f e f e e 
            1 1 1 1 1 e f e e f e e e f e e 
            `, SpriteKind.Enemy)
        myEnemy.follow(mySprite, 50)
    }
    tiles.placeOnRandomTile(myEnemy, sprites.builtin.crowd8)
})
function newGame () {
    if (Level == 0) {
        tiles.setTilemap(tilemap`level1`)
    } else if (Level == 1) {
        tiles.setTilemap(tilemap`level5`)
    } else if (Level == 2) {
        tiles.setTilemap(tilemap`level4`)
    } else {
        game.over(true)
    }
    chances = 3
    tiles.placeOnRandomTile(mySprite, sprites.builtin.crowd4)
    info.setLife(3)
    info.startCountdown(5)
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.Enemy, function (sprite, otherSprite) {
    info.changeLifeBy(-1)
    myEnemy.destroy()
    info.startCountdown(0.5)
})
let chances = 0
let myEnemy: Sprite = null
let Level = 0
let mySprite: Sprite = null
scene.setBackgroundColor(15)
mySprite = sprites.create(img`
    . . . . . 2 2 2 2 2 2 . . . . . 
    . . . . 2 f f 2 2 f f 2 . . . . 
    . . . 2 2 2 2 2 2 2 2 2 2 . . . 
    2 2 2 2 2 d d 2 2 d d 2 2 2 2 2 
    2 2 2 2 2 2 d d d d 2 2 2 2 2 2 
    2 2 . 2 2 2 2 2 2 2 2 2 2 . 2 2 
    2 2 . 2 2 2 2 2 2 2 2 2 2 . 2 2 
    1 1 . 2 2 2 2 2 2 2 2 2 2 . 1 1 
    1 1 . 2 2 2 2 2 2 2 2 2 2 . 1 1 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    . . . . 2 2 2 . . 2 2 2 . . . . 
    `, SpriteKind.Player)
controller.moveSprite(mySprite, 100, 100)
scene.cameraFollowSprite(mySprite)
info.setScore(0)
newGame()
