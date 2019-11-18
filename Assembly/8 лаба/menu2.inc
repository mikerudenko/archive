
WM_DESTROY             equ 2

WM_CREATE              equ 1

WM_COMMAND             equ 111h
WM_MENUSELECT          equ 11Fh
WM_SETTEXT             equ 0Ch
MIIM_TYPE              equ 10h
MF_STRING              equ 0h
MF_POPUP               equ 10h

CS_VREDRAW             equ 1h
CS_HREDRAW             equ 2h
CS_GLOBALCLASS         equ 4000h
WS_OVERLAPPEDWINDOW    equ 000CF0000HNEAR
STYLE equ CS_HREDRAW+CS_VREDRAW+CS_GLOBALCLASS
BS_DEFPUSHBUTTON       equ 1h
WS_VISIBLE             equ 10000000h
WS_CHILD               equ 40000000h
STYLBTN equ WS_CHILD+BS_DEFPUSHBUTTON+WS_VISIBLE

IDI_APPLICATION        equ 32512

IDC_ARROW              equ 32512

SW_SHOWNORMAL          equ 1
SW_HIDE                equ 0
SW_SHOWMINIMIZED       equ 2


EXTERN   wsprintfA:NEAR
EXTERN   GetMenuItemInfoA@16:NEAR
EXTERN   LoadMenuA@8:NEAR
EXTERN   SendMessageA@16:NEAR
EXTERN   MessageBoxA@16:NEAR
EXTERN   CreateWindowExA@48:NEAR
EXTERN   DefWindowProcA@16:NEAR
EXTERN   DispatchMessageA@4:NEAR
EXTERN   ExitProcess@4:NEAR
EXTERN   GetMessageA@16:
EXTERN   GetModuleHandleA@4:NEAR
EXTERN   LoadCursorA@8:NEAR
EXTERN   LoadIconA@8:NEAR
EXTERN   PostQuitMessage@4:NEAR
EXTERN   RegisterClassA@4:NEAR
EXTERN   ShowWindow@8:NEAR
EXTERN   TranslateMessage@4:NEAR
EXTERN   UpdateWindow@4:NEAR
EXTERN   TranslateAcceleratorA@12:NEAR
EXTERN   LoadAcceleratorsA@8:NEAR
EXTERN   GetMenu@4:NEAR
EXTERN   DestroyMenu@4:NEAR
EXTERN   SetMenu@8:NEAR


MSGSTRUCT STRUC
     MSHWND    DD ?
     MSMESSAGE DD ?
     MSWPARAM  DD ?
     MSLPARAM  DD ?
     MSTIME    DD ?
     MSPT      DD ?
MSGSTRUCT ENDS


WNDCLASS STRUC
     CLSSTYLE   DD ?
     CLWNDPROC  DD ?
     CLSCBCLSEX DD ?
     CLSCBWNDEX DD ?
     CLSHINST   DD ?
     CLSHICON   DD ?
     CLSHCURSOR DD ?
     CLBKGROUND DD ?
     CLMENNAME  DD ?
     CLNAME     DD ?
WNDCLASS ENDS

MENINFO STRUCT
     cbSize        DD ?
     fMask         DD ?
     fType         DD ?
     fState        DD ?
     wID           DD ?
     hSubMenu      DD ?
     hbmpChecked   DD ?
     hbmpUnchecked DD ?
     dwItemData    DD ?
     dwTypeData    DD ?
     cch           DD ?
MENINFO ENDS
