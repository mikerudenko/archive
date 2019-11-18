-module(lab11).

-export([coordSystem/1]).

% ? Type of coordinate system
coordSystem('XYZ') -> '3D system of coordinates';
coordSystem('XZY') -> '3D system of coordinates';
coordSystem('YXZ') -> '3D system of coordinates';
coordSystem('YZX') -> '3D system of coordinates';
coordSystem('ZXY') -> '3D system of coordinates';
coordSystem('ZYX') -> '3D system of coordinates';
coordSystem('XY') -> '2D system of coordinates';
coordSystem('YX') -> '2D system of coordinates';
coordSystem('X') -> 'Line system of coordinates'.
