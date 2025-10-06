@echo off
setlocal enabledelayedexpansion

:: --- LOGIN Y OBTENER TOKEN ---
for /f "delims=" %%T in ('powershell -Command ^
  "(Invoke-RestMethod -Uri 'https://meddi-training.vercel.app/api/v1/user/login' -Method Post -ContentType 'application/json' -Body '{\"username\":\"pablito2.robles@example.com\",\"password\":\"Prueba1234\"}').data.jwtToken"') do set TOKEN=%%T

if not defined TOKEN (
    echo ❌ No se pudo obtener el token.
    pause
    exit /b
)

echo ✅ Token obtenido:
echo %TOKEN%
echo.

:: --- CREAR HOSPITAL ---
echo Creando hospital...
curl -s -X POST "https://meddi-training.vercel.app/api/v1/hospital/create" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%" ^
  -d "{\"name\":\"Hospital Esperanza\",\"direccion\":\"Av Perla 4321, Zapopan\",\"telefono\":\"3318828366\",\"horario\":\"Lun-Vie 8:00-18:00\",\"urlGoogleMaps\":\"https://maps.google.com/?q=Hospital+Esperanza\",\"long\":\"-103.349609\",\"lat\":\"20.659699\"}"

echo.
echo --- Verificando lista de hospitales ---
curl -s -X GET "https://meddi-training.vercel.app/api/v1/hospital/get/all" ^
  -H "Content-Type: application/json" ^
  -H "Authorization: Bearer %TOKEN%"

pause
