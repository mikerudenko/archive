Code segment byte public
	assume CS:Code
	public asmproc
asmproc proc near
	push bp
	mov bp, sp
mov bx, offset [bp+12]  ; 1-й елемент м-ву b
lds di, dword ptr [bp+4]  ; bp→ds,  4→di, адреса масиву результату с
mov cx, 4
M1:
	mov ax, [bx]  ; b1
	mov ds:[di], ax ;  ds→b1….b5
	add di, 2
	add bx, 2
loop M1
;----------------------
	mov cx, 6
	mov bx, offset [bp+8]  ; a1
M2:
	mov ax, [bx]  ;  
	mov ds: [di], ax  ;  ds→a1………a5        b1………b5
	add di, 2
	add bx, 2
	loop M2
;----------------------------
	mov cx, 3
	mov bx, offset [bp+12]  ; a1
M3:
	mov ax, [bx] + 8  ;  
	mov ds: [di], ax  ;  ds→a1………a5        b1………b5
	add di, 2
	add bx, 2
	loop M3

	pop bp
ret
asmproc endp
Code ends
	END