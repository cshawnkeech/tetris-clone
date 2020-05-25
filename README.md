# tetris-clone
A basic version of Tetris. Created by following along with a tutorial (see links below) and then adding custom features. 

Custom Features Added to the Original:

5/24/2020:
  Score persists when game over is displayed (until browser is refreshed);

  Remaining 2 Tetrominoes were added (mirror L & mirror Z), bringing total possible to 7 (as in original game)

  Color & formatting CSS updated for tetrominoes, providing outline & border radius

  Controls do not respond while paused or game-over


Created May 23-24 following Ania Kubow's tutorial:
https://youtu.be/rAUn1Lom6dw

Ania's YouTube Channel:
https://www.youtube.com/channel/UC5DNytAJ6_FISueUfzZCVsw

/*
Future Feature Options:

  bug: collision currently allows a shape to rotate through edge

  bug: when multiple lines complete simultaneously, new shape often is drawn twice, once further down the screen than it should be due to the way that lines are appended (try iterating from end of array, try checking array from 0 twice to ensure all matches done)

  bug: nextRandom changes next shape when game is paused. can be used to cheat.

  Score: bonuses for double, triple, tetris

  Level up based upon score or number of lines cleared (every 10 lines)

  Speed increase with level up

  line clear animation

  Controls to rotate clockwise and counter-clockwise

  Provide touch controls in order to play on phone

  Possible stats for shapes

  Start/Pause restarts game after game over

  Add persistent High Score until browser refresh

  persistent High Score on client (possible persistent on server side?)





*/
