.MODEL small
.Stack 100h
Datas segment
	a dw 2
	b dw 3
	c dw 2
	x dw 8
	message db 'Error division by zero!$'
Datas ends
Codes segment
Assume cs:Codes, ds:Datas
First:

		mov ax, Datas
		mov ds, ax

		; z = 25*a*b+((x-a)*22*b*20*x)/(c*c);

		mov ax, c	
		; CHECK C != 0
		cmp ax, 0
		je short @op4 
		
		mov ax,x
		mov cx,a
		sub ax,cx
		
		cmp ax,0 
		je short @res
		
		mov cx,22
		imul cx ; (x-a)*22
		mov cx,20
		imul cx ; (x-a)*22*20
		mov cx,x
		imul cx
		mov cx,b
		imul cx	; (x-a)*22b*20x
		
		push ax
		
		mov ax,c
		imul ax
		mov cx,ax
		pop ax
		xor dx, dx	
		cwd	
		idiv cx	; AX/AC 
		
		push ax
		
		mov ax, c	
		mov cx, b
		imul cx
		mov cx, 22
		imul cx	; ax = 22ab

		pop cx
		
		adc ax,cx
		
		
		jmp short @op5

@op4:	;ZERO
		mov ah, 40h		
		mov bx, 1			
		mov cx, 23
		lea dx, message
		int 21h	
		mov ah, 4ch
		int 21h

@res:
		mov ax, c	
		mov cx, b
		imul cx
		mov cx, 17
		imul cx	; ax = 17ab
		jmp short @op5

@op5:

	 	push    ax
	 	test    ax, ax

; Output sign 
        jns     short @op1 
        mov     ah, 02h 
        mov     dl, '-' 
        int     21h 
        pop     ax 
        ;push    ax 
        neg     ax
        jmp     short @op1

; Output number
@op1:   xor     cx, cx 
        mov     bx, 10
@op2:   xor     dx, dx 
        div     bx
        push    dx
        inc     cx
        test    ax, ax
        jnz     short @op2
        mov     ah, 02h
@op3:   pop     dx 
        add     dl, 30h 
        int     21h 
        loop    @op3 
        pop     ax 

	
mov ah, 4ch
int 21h


Codes ends
end First