.MODEL small
.data
.code
	public asmproc ;;;;;;;;;;;;;;;;;;
main:
	asmproc proc near ;;;;;;;;;;;;;
		push bp ;;;;;;;;;;
		mov bp, sp

	lds di, dword ptr [bp+4] 

	mov bx, offset [bp+8]
	mov cx, 5
	M1:
		mov ax, [bx]
		mov ds:[di], ax
		add di, 2
		add bx, 2
		loop M1

	mov bx, offset [bp+12]
	lds di, dword ptr [bp+4]

	mov cx, 5
	M2:
		mov ax, [bx]
		mov dx, ds:[di]
		imul dx
		mov ds:[di], ax 
		add di, 2
		add bx, 2
		loop M2

		pop bp ;;;;;;;;;;;;;
	ret ;;;;;;;;;;;;;;;;;;
	asmproc endp
end main
