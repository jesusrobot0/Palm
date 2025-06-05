# 🧪 Guía de Testing - Palm Universal Clipboard

## 🔧 **Problemas Solucionados:**

### ✅ **Fixes Aplicados:**
1. **🚨 CRÍTICO**: ServerService ahora retransmite mensajes entre clientes (era el problema principal)
2. **📦 Dependencias**: Reemplazado `clipboardy` con plugin oficial de Tauri
3. **🔌 Comunicación**: Mejorado el logging para debugging
4. **⚙️ Permisos**: Configurado permisos de clipboard en Tauri

---

## 🧪 **Cómo Probar la Sincronización:**

### **Paso 1: Compilar las Apps**
```bash
# En el directorio raíz del proyecto
cd apps/palm-client
npm run tauri build
```

### **Paso 2: Copiar el Ejecutable a Ambos Dispositivos**
- **Windows**: `src-tauri/target/release/palm-client.exe`
- **Mac**: `src-tauri/target/release/palm-client` o bundle en `src-tauri/target/release/bundle/`

### **Paso 3: Configurar la Red**
1. **Asegúrate de que ambos dispositivos estén en la misma red WiFi**
2. **Encuentra la IP del Mac**:
   ```bash
   ifconfig | grep "inet " | grep -v 127.0.0.1
   ```

### **Paso 4: Probar la Sincronización**

#### **En Mac (Host):**
1. Abrir la app Palm
2. Hacer clic en **"Ser Host"** 
3. La app mostrará: ✅ Escuchando en puerto 8080

#### **En Windows (Cliente):**
1. Abrir la app Palm
2. Hacer clic en **"Ser Cliente"**
3. Introducir la **IP del Mac** (ej: `192.168.1.100`)
4. Hacer clic en **"Conectar"**
5. Debe mostrar: ✅ Conectado a [IP]

#### **Verificar Sincronización:**
1. **Copiar texto en Mac** → Debe aparecer automáticamente en clipboard de Windows
2. **Copiar texto en Windows** → Debe aparecer automáticamente en clipboard de Mac

---

## 🐛 **Debugging:**

### **Ver Logs en Consola:**
- **Mac**: Abrir con Terminal para ver logs
- **Windows**: Ejecutar desde CMD para ver logs

### **Logs Esperados:**
```
🔌 Connecting to: ws://192.168.1.100:8080
✅ Connected to: ws://192.168.1.100:8080
📤 Sending clipboard update: Hello World...
📨 Received message: {type: "clipboard", data: "Hello World"}
```

### **Problemas Comunes:**
1. **💥 WebSocket error**: Verificar IP y red
2. **❌ Connection closed**: Firewall o red
3. **No sincroniza**: Verificar permisos de clipboard

---

## 🔍 **Logs de Red:**

Revisa estos archivos para debugging:
- `/packages/core/src/ServerService.ts` - Servidor WebSocket
- `/packages/core/src/SyncService.ts` - Cliente WebSocket  
- `/packages/core/src/Clipboardservice.ts` - Acceso al clipboard

---

## ⚠️ **Notas Importantes:**

1. **El HOST debe iniciarse PRIMERO** antes que el cliente
2. **Ambos dispositivos deben estar en la misma red**
3. **Firewall puede bloquear el puerto 8080**
4. **Tauri requiere permisos de clipboard** (ya configurado)

¡Ahora debería funcionar la sincronización! 🎉 