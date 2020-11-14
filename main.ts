namespace SpriteKind {
    export const Card = SpriteKind.create()
}
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    changeCursorPositionBy(0, -1)
})
function toggleCursor (cardTile: Sprite, cursorOn: boolean) {
    if (cardTile != null) {
        cardTile.setImage(cursorOn ? cardCursorBackground : cardBackground)
    }
}
function changeCursorPositionBy (changeX: number, changeY: number) {
    if (selectable) {
        let newX: number = Math.clamp(0, 3, cursorX + changeX);
        let newY: number = Math.clamp(0, 3, cursorY + changeY);
        moveCursor(newX, newY)
    }
}
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (selectable && !(revealedCards[cursorX][cursorY])) {
        selectable = false
        targetTile = cardTiles[cursorX][cursorY]
        targetTypeNum = cardTypeOrder[4 * cursorX + cursorY]
        cardImageSprite = sprites.create(cardImages[targetTypeNum], 0)
        cardImageSprite.setPosition(targetTile.x, targetTile.y)
        cardImageSprite.layer = 2;
        revealedCards[cursorX][cursorY] = true
        if (previousCardPosX != null && previousCardPosY != null) {
            timer.after(500, function () {
                if (targetTypeNum == previousCardType) {
                    cardsLeft += 0 - 2
                    if (cardsLeft > 0) {
                        music.baDing.play()
                    } else {
                        game.over(true)
                    }
                } else {
                    revealedCards[cursorX][cursorY] = false
                    revealedCards[previousCardPosX][previousCardPosY] = false
                    cardImageSprite.destroy()
                    previousCardImageSprite.destroy()
                }
                previousCardPosX = null
                previousCardPosY = null
                previousCardImageSprite = null
                previousCardType = null
                selectable = true
            });
        } else {
            previousCardPosX = cursorX
            previousCardPosY = cursorY
            previousCardImageSprite = cardImageSprite
            previousCardType = targetTypeNum
            selectable = true
        }
    }
})
controller.left.onEvent(ControllerButtonEvent.Pressed, function () {
    changeCursorPositionBy(-1, 0)
})
controller.right.onEvent(ControllerButtonEvent.Pressed, function () {
    changeCursorPositionBy(1, 0)
})
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    changeCursorPositionBy(0, 1)
})
function moveCursor (newX: number, newY: number) {
    originalCursorX = cursorX
    originalCursorY = cursorY
    cursorX = newX
    cursorY = newY
    if (cursorX != originalCursorX || cursorY != originalCursorY) {
        toggleCursor(cardTiles[originalCursorX][originalCursorY], false)
    }
    toggleCursor(cardTiles[cursorX][cursorY], true)
}
let originalCursorY = 0
let originalCursorX = 0
let cardImageSprite: Sprite = null
let targetTypeNum = 0
let targetTile: Sprite = null
let selectable = false
let cardsLeft = 0
let revealedCards: boolean[][] = []
let card: Sprite = null
let cardTiles: Sprite[][] = []
let cardImages: Image[] = []
let previousCardImageSprite: Sprite = null
let previousCardType: number = null
let previousCardPosY: number = null
let previousCardPosX: number = null
let cursorY: number = 0
let cursorX: number = 0
let cardTypeOrder: number[] = []
cardImages = [
img`
    . . . . c c c b b b b b . . . . 
    . . c c b 4 4 4 4 4 4 b b b . . 
    . c c 4 4 4 4 4 5 4 4 4 4 b c . 
    . e 4 4 4 4 4 4 4 4 4 5 4 4 e . 
    e b 4 5 4 4 5 4 4 4 4 4 4 4 b c 
    e b 4 4 4 4 4 4 4 4 4 4 5 4 4 e 
    e b b 4 4 4 4 4 4 4 4 4 4 4 b e 
    . e b 4 4 4 4 4 5 4 4 4 4 b e . 
    8 7 e e b 4 4 4 4 4 4 b e e 6 8 
    8 7 2 e e e e e e e e e e 2 7 8 
    e 6 6 2 2 2 2 2 2 2 2 2 2 6 c e 
    e c 6 7 6 6 7 7 7 6 6 7 6 c c e 
    e b e 8 8 c c 8 8 c c c 8 e b e 
    e e b e c c e e e e e c e b e e 
    . e e b b 4 4 4 4 4 4 4 4 e e . 
    . . . c c c c c e e e e e . . . 
    `,
img`
    . . . . . . . e c 7 . . . . . . 
    . . . . e e e c 7 7 e e . . . . 
    . . c e e e e c 7 e 2 2 e e . . 
    . c e e e e e c 6 e e 2 2 2 e . 
    . c e e e 2 e c c 2 4 5 4 2 e . 
    c e e e 2 2 2 2 2 2 4 5 5 2 2 e 
    c e e 2 2 2 2 2 2 2 2 4 4 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 2 2 e 
    c e e 2 2 2 2 2 2 2 2 2 2 4 2 e 
    . e e e 2 2 2 2 2 2 2 2 2 4 e . 
    . 2 e e 2 2 2 2 2 2 2 2 4 2 e . 
    . . 2 e e 2 2 2 2 2 4 4 2 e . . 
    . . . 2 2 e e 4 4 4 2 e e . . . 
    . . . . . 2 2 e e e e . . . . . 
    `,
img`
    4 4 4 . . 4 4 4 4 4 . . . . . . 
    4 5 5 4 4 5 5 5 5 5 4 4 . . . . 
    b 4 5 5 1 5 1 1 1 5 5 5 4 . . . 
    . b 5 5 5 5 1 1 5 5 1 1 5 4 . . 
    . b d 5 5 5 5 5 5 5 5 1 1 5 4 . 
    b 4 5 5 5 5 5 5 5 5 5 5 1 5 4 . 
    c d 5 5 5 5 5 5 5 5 5 5 5 5 5 4 
    c d 4 5 5 5 5 5 5 5 5 5 5 1 5 4 
    c 4 5 5 5 d 5 5 5 5 5 5 5 5 5 4 
    c 4 d 5 4 5 d 5 5 5 5 5 5 5 5 4 
    . c 4 5 5 5 5 d d d 5 5 5 5 5 b 
    . c 4 d 5 4 5 d 4 4 d 5 5 5 4 c 
    . . c 4 4 d 4 4 4 4 4 d d 5 d c 
    . . . c 4 4 4 4 4 4 4 4 5 5 5 4 
    . . . . c c b 4 4 4 b b 4 5 4 4 
    . . . . . . c c c c c c b b 4 . 
    `,
img`
    . . . . . . b b b b . . . . . . 
    . . . . . . b 4 4 4 b . . . . . 
    . . . . . . b b 4 4 4 b . . . . 
    . . . . . b 4 b b b 4 4 b . . . 
    . . . . b d 5 5 5 4 b 4 4 b . . 
    . . . . b 3 2 3 5 5 4 e 4 4 b . 
    . . . b d 2 2 2 5 7 5 4 e 4 4 e 
    . . . b 5 3 2 3 5 5 5 5 e e e e 
    . . b d 7 5 5 5 3 2 3 5 5 e e e 
    . . b 5 5 5 5 5 2 2 2 5 5 d e e 
    . b 3 2 3 5 7 5 3 2 3 5 d d e 4 
    . b 2 2 2 5 5 5 5 5 5 d d e 4 . 
    b d 3 2 d 5 5 5 d d d 4 4 . . . 
    b 5 5 5 5 d d 4 4 4 4 . . . . . 
    4 d d d 4 4 4 . . . . . . . . . 
    4 4 4 4 . . . . . . . . . . . . 
    `,
img`
    . . . . . . f f f f . . . . . . 
    . . . . f f f 2 2 f f f . . . . 
    . . . f f f 2 2 2 2 f f f . . . 
    . . f f f e e e e e e f f f . . 
    . . f f e 2 2 2 2 2 2 e e f . . 
    . . f e 2 f f f f f f 2 e f . . 
    . . f f f f e e e e f f f f . . 
    . f f e f b f 4 4 f b f e f f . 
    . f e e 4 1 f d d f 1 4 e e f . 
    . . f e e d d d d d d e e f . . 
    . . . f e e 4 4 4 4 e e f . . . 
    . . e 4 f 2 2 2 2 2 2 f 4 e . . 
    . . 4 d f 2 2 2 2 2 2 f d 4 . . 
    . . 4 4 f 4 4 5 5 4 4 f 4 4 . . 
    . . . . . f f f f f f . . . . . 
    . . . . . f f . . f f . . . . . 
    `,
img`
    . . . . . . . c c . . . . . . . 
    . . . . c c c 6 5 c 6 6 . . . . 
    . . . . c 6 c 5 5 c 7 6 . . . . 
    . . . 6 c c 7 5 5 7 c 6 6 . . . 
    . . c c 7 7 7 7 7 5 7 7 c 6 . . 
    . 6 6 6 c 6 7 7 7 7 6 c c 6 6 . 
    c 7 7 7 6 c 7 c 6 7 6 7 7 7 7 6 
    c c c 6 6 6 c 6 6 6 6 7 7 6 6 6 
    . c c 7 6 6 6 6 6 7 7 7 7 c 6 . 
    . c 7 7 6 6 7 6 6 7 7 6 7 7 c . 
    . c c c c 7 7 6 f 7 7 c c c c . 
    . . . . c 7 c f f c 7 c . . . . 
    . . . . . 6 f e e e c . . . . . 
    . . . . . e e e e e e . . . . . 
    . . . . e e . e e . e e . . . . 
    . . . . . . . e e . . . . . . . 
    `,
img`
    . . . . . f c c c c f . . . . . 
    . . c c f b b 3 3 b b f c c . . 
    . c b 3 3 b b c c b b 3 3 b c . 
    . f 3 c c c b c c b c c c 3 f . 
    f c b b c c b c c b c c b b c f 
    c 3 c c b c c c c c c b c c 3 c 
    c 3 c c c c c c c c c c c c 3 c 
    . f b b c c c c c c c c b b f . 
    . . f b b c 8 9 9 8 c b b f . . 
    . . c c c f 9 3 1 9 f c c c . . 
    . c 3 f f f 9 3 3 9 f f f 3 c . 
    c 3 f f f f 8 9 9 8 f f f f 3 c 
    f 3 c c f f f f f f f f c c 3 f 
    f b 3 c b b f b b f b b c 3 b f 
    . c b b 3 3 b 3 3 b 3 3 b b c . 
    . . f f f f f f f f f f f f . . 
    `,
img`
    . . . . . . . . . . b 5 b . . . 
    . . . . . . . . . b 5 b . . . . 
    . . . . . . . . . b c . . . . . 
    . . . . . . b b b b b b . . . . 
    . . . . . b b 5 5 5 5 5 b . . . 
    . . . . b b 5 d 1 f 5 5 d f . . 
    . . . . b 5 5 1 f f 5 d 4 c . . 
    . . . . b 5 5 d f b d d 4 4 . . 
    b d d d b b d 5 5 5 4 4 4 4 4 b 
    b b d 5 5 5 b 5 5 4 4 4 4 4 b . 
    b d c 5 5 5 5 d 5 5 5 5 5 b . . 
    c d d c d 5 5 b 5 5 5 5 5 5 b . 
    c b d d c c b 5 5 5 5 5 5 5 b . 
    . c d d d d d d 5 5 5 5 5 d b . 
    . . c b d d d d d 5 5 5 b b . . 
    . . . c c c c c c c c b b . . . 
    `
]
for (let i = 0; i <= 7; i++) {
    for (let index = 0; index < 2; index++) {
        cardTypeOrder.push(i)
    }
}
for (let k: number = cardTypeOrder.length - 1; k > 0; k--) {
    let l: number = randint(0, cardTypeOrder.length - 1);
    [cardTypeOrder[k], cardTypeOrder[l]] = [cardTypeOrder[l], cardTypeOrder[k]];
}
let cardBackground = img`
    d 1 1 1 1 1 1 1 1 1 1 1 1 1 1 b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    1 d d d d d d d d d d d d d d b 
    b b b b b b b b b b b b b b b b 
    `
let cardCursorBackground = img`
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 4 
    `
for (let m = 0; m <= 3; m++) {
    cardTiles[m] = []
    for (let n = 0; n <= 3; n++) {
        card = sprites.create(cardBackground, SpriteKind.Card)
        card.setPosition(56 + 16 * m, 38 + 16 * n)
        cardTiles[m][n] = card
    }
}
moveCursor(cursorX, cursorY)
for (let o = 0; o <= 3; o++) {
    revealedCards[o] = []
    for (let p = 0; p <= 3; p++) {
        revealedCards[o][p] = false
    }
}
cardsLeft = 16
selectable = true
game.splash("CARD MATCH")
game.setDialogFrame(img`
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 f f f f f f f f f f f f f 1 
    1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    . . . . . . . . . . . . . . . 
    `)
game.setDialogTextColor(1)
game.showLongText("D-Pad (Up, Down, Left, Right): Select a card.", DialogLayout.Bottom)
game.showLongText("A: Reveal card.", DialogLayout.Bottom)
game.showLongText("Find all the matching pairs to win!", DialogLayout.Bottom)
