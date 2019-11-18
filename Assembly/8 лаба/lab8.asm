;working with 32-bit architecture pentium
.386P
; плоская модель
.MODEL FLAT, stdcall
include menu2.inc
;includingsк
includelib c:\masm32\lib\user32.lib 
includelib c:\masm32\lib\kernel32.lib
; ------------------------------------------------------------

;
_DATA SEGMENT DWORD PUBLIC USE32 'DATA'
     SPACE     DB 30 dup(32),0 ;for titles buffer
     MENI      MENINFO  <0>
     NEWHWND   DD 0
     MSG       MSGSTRUCT <?>
     WC        WNDCLASS  <?>
     HINST     DD 0  ;descriptor of app
     CLASSNAME DB 'CLASS32',0
     CPBUT     DB 'Кнопка',0 ; выход
     CLSBUTN   DB 'BUTTON',0
     HWNDBTN   DD 0 ;descriptor of button
     CAP       DB 'Сообщение',0
     MES       DB 'Конец работы программы',0
     MEN       DB 'MENUP',0
     MENC      DB 'MENUC',0
     ACC       DD ?
     HMENU     DD ?
     PRIZN     DD ?
     BUFER     DB 100 DUP(0)
_DATA ENDS

; сегмент кода
_TEXT SEGMENT DWORD PUBLIC USE32 'CODE'
START:
;четчик
     MOV  PRIZN, 2
; получить дескриптор приложения
     PUSH 0
     CALL GetModuleHandleA@4
     MOV  [HINST], EAX
REG_CLASS:
; заполнить структуру окна
; стиль
     MOV  [WC.CLSSTYLE], STYLE
; процедура обработки сообщений
     MOV  [WC.CLWNDPROC], OFFSET WNDPROC
     MOV  [WC.CLSCBCLSEX], 0
     MOV  [WC.CLSCBWNDEX], 0
     MOV EAX, [HINST]
     MOV  [WC.CLSHINST], EAX
; ----------иконка окна
     PUSH IDI_APPLICATION
     PUSH 0
     CALL LoadIconA@8
     MOV  [WC.CLSHICON], EAX
; ----------курсор окна
     PUSH IDC_ARROW
     PUSH 0
     CALL LoadCursorA@8
     MOV  [WC.CLSHCURSOR], EAX
; ——————----
     MOV  [WC.CLBKGROUND], 17 ; цвет окна
     MOV DWORD PTR [WC.CLMENNAME], OFFSET MEN
     MOV DWORD PTR [WC.CLNAME], OFFSET CLASSNAME
     PUSH OFFSET WC
     CALL RegisterClassA@4
; создать окно зарегистрированного класса
     PUSH 0
     PUSH [HINST]
     PUSH 0
     PUSH 0
     PUSH 400  ; DY - высота окна
     PUSH 400  ; DX - ширина окна
     PUSH 100  ; Y
     PUSH 100  ; X
     PUSH WS_OVERLAPPEDWINDOW
     PUSH OFFSET SPACE ; имя окна
     PUSH OFFSET CLASSNAME ; имя класса
     PUSH 0
     CALL CreateWindowExA@48
; проверка на ошибку
     CMP EAX, 0
     JZ  _ERR
     MOV  [NEWHWND], EAX ; дескриптор окна
; определить идентификатор меню
     PUSH EAX
     CALL GetMenu@4
     MOV HMENU, EAX
; загрузить акселераторы
     PUSH OFFSET MEN
     PUSH [HINST]
     CALL LoadAcceleratorsA@8
     MOV ACC, EAX
; --———————————————————-
     PUSH SW_SHOWNORMAL
     PUSH [NEWHWND]
     CALL ShowWindow@8 ; показать созданное окно
; -------------------------
     PUSH [NEWHWND]
     CALL UpdateWindow@4 ; команда перерисовать видимую
                         ; часть окна, сообщение WM_PAINT
; петля обработки сообщений
MSG_LOOP:
     PUSH 0
     PUSH 0
     PUSH 0
     PUSH OFFSET MSG
     CALL GetMessageA@16
     CMP EAX, 0
     JE  END_LOOP
     PUSH OFFSET MSG
     PUSH [ACC]
     PUSH [NEWHWND]
     CALL TranslateAcceleratorA@12
     CMP EAX, 0
     JNE MSG_LOOP
     PUSH OFFSET MSG
     CALL TranslateMessage@4
     PUSH OFFSET MSG
     CALL DispatchMessageA@4
     JMP MSG_LOOP
END_LOOP:
; выход из программы (закрыть процесс)
     PUSH [MSG.MSWPARAM]
     CALL ExitProcess@4
_ERR:
     JMP END_LOOP

;----------------------------------------
; процедура окна
; расположение параметров в стеке
; [EBP+014Н]  ; LPARAM
; [EBP+10H]   ; WAPARAM
; [EBP+0CH]   ; MES
; [EBP+8]     ; HWND
WNDPROC    PROC
     PUSH EBP
     MOV EBP,ESP
     PUSH EBX
     PUSH ESI
     PUSH EDI
; сообщение WM_DESTROY - при закрытии окна
     CMP DWORD PTR [EBP+0CH], WM__DESTROY
     JE  WMDESTROY
; сообщение WM CREATE - при создании окна
     CMP DWORD PTR [EBP+0CH], WM_CREATE
     JE  WMCREATE
; сообщение WM COMMAND - при событиях с элементами на окне
     CMP DWORD PTR [EBP+0CH], WM_COMMAND
     JE  WMCOMMND
; сообщение WM_MENUSELECT - события, связанные с меню
     CMP DWORD PTR [EBP+0CH], WM_MENUSELECT
     JE WMMENUSELECT
; остальные события возвращаем обратно
     JMP DEFWNDPROC
WMMENUSELECT:
; пропускаем первое сообщение при обращении к меню
     CMP WORD PTR [EBP+14Н],0
     JE  FINISH
; проверяем, что активизировано - пункт меню
;или заголовок выпадающего меню
     MOV EDX, 0
     TEST WORD PTR [EBP+12H],MF_POPUP
     SETNE DL
; заполнение структуры для вызова функции
; GetMenuItemInfo
     MOVZX EAX,WORD PTR [EBP+10H] ; идентификатор
     MOV MENI.cbSize,48
     MOV MENI.fMask, MIIM_TYPE
     MOV MENI.fType, MF_STRING
     MOV EBX, DWORD PTR [EBP+14H]
     MOV MENI.hSubMenu, EBX
     MOV MENI.dwTypeData, OFFSET BUFER
     MOV MENI.cch, 100
; получить информацию о выбранном пункте меню
     PUSH OFFSET MENI
     PUSH EDX
     PUSH EAX
     PUSH DWORD PTR [EBP+14H]
     CALL GetMenuItemInfoA@16
; проверить результат выполнения функции
     CMP EAX, 0
     JE FINISH
; вывести название пункта меню
     PUSH MENI.dwTypeData
     PUSH 0
     PUSH WM_SETTEXT
     PUSH DWORD PTR [EBP+0BH]
     CALL SendMessageA@16
     MOV EAX, 0
     JMP FINISH
WMCOMMND:
     MOV EAX, HWNDBTN
; проверить, не нажата ли кнопка
     CMP DWORD PTR [EBP+14Н], EAX
     JE  YES_BUT
; проверить, не выбран ли пункт меню MENUC - Выход
     CMP WORD PTR [EBP+10Н],5
     JE  WMDESTROY
; проверить, не выбран ли пункт меню с идентификатором 5
     CMP WORD PTR [EBP+10Н], 4
     JNE L00
     JMP YES_BUT
L00:
     MOV EAX, 0
     JMP FINISH
YES_BUT:
; здесь обработка нажатия кнопки
; вначале стереть надпись в заголовке
     PUSH OFFSET SPACE
     PUSH 0
     PUSH WM_SETTEXT
     PUSH DWORD PTR [EBP+08H]
     CALL SendMessageA@16
; проверить загружено или нет меню
     CMP PRIZN, 0
     JE  L1
     CMP PRIZN, 1
     JE  L2
; загрузить меню MENC
     PUSH OFFSET MENC
     PUSH [HINST]
     CALL LoadMenuA@8
; установить меню
     MOV HMENU, EAX
     PUSH EAX
     PUSH DWORD PTR [EBP+08H]
     CALL SetMenu@8
; установить признак
     MOV PRIZN,0
     MOV EAX,0
     JMP FINISH
L2:
; загрузить меню MENUP
     PUSH OFFSET MEN
     PUSH [HINST]
     CALL LoadMenuA@8
; установить меню
     MOV  HMENU, EAX
     PUSH EAX
     PUSH DWORD PTR [EBP+08H]
     CALL SetMenu@8
; установить признак
     MOV PRIZN, 2
     MOV EAX,0
     JMP FINISH
L1:
; удалить меню
     PUSH HMENU
     CALL DestroyMenu@4
; обновить содержимое окна
     PUSH SW_SHOWMINIMIZED
     PUSH DWORD PTR [EBP+08H]
     CALL ShowWindow@8
     PUSH SW_SHOWNORMAL
     PUSH DWORD PTR [EBP+08H]
     CALL ShowWindow@8
     MOV PRIZN,1
     MOV EAX, 0
     JMP FINISH
WMCREATE:
; создать окно-кнопку
     PUSH 0
     PUSH [HINST]
     PUSH 0
     PUSH DWORD PTR [EBP+08H]
     PUSH 20   ; DY
     PUSH 60   ; DX
     PUSH 10   ; Y
     PUSH 10   ; X
     PUSH STYLBTN
; имя окна (надпись на кнопке)
     PUSH OFFSET CPBUT
     PUSH OFFSET CLSBUTN ; имя класса
     PUSH 0
     CALL CreateWindowExA@48
     MOV HWNDBTN, EAX ; запомнить дескриптор кнопки
     MOV EAX, 0
     JMP FINISH
DEFWNDPROC:
     PUSH DWORD PTR [EBP+14H]
     PUSH DWORD PTR [EBP+10H]
     PUSH DWORD PTR [EBP+0CH]
     PUSH DWORD PTR [EBP+08H]
     CALL DefWindowProcA@16
     JMP  FINISH
WMDESTROY:
     PUSH 0         ; MB_OK
     PUSH OFFSET CAP
     PUSH OFFSET MES
     PUSH DWORD PTR [EBP+08H] ; дескриптор окна
     CALL MessageBoxA@16
     PUSH 0
     CALL PostQuitMessage@4 ; сообщение WM_QUIT
     MOV EAX, 0
FINISH:
     POP EDI
     POP ESI
     POP EBX
     POP EBP
     RET 16
WNDPROC ENDP
_TEXT ENDS
END START
