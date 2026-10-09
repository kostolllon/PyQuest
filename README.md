 Шаг 1. Скачайте проект
Вариант А — через Git (если он у Вас установлен)
Откройте терминал и выполните:

bash
git clone https://github.com/ВАШ_НИК/PyQuest.git
cd PyQuest
Вариант Б — через ZIP-архив (проще)
Откройте страницу репозитория на GitHub.

Нажмите зелёную кнопку Code → Download ZIP.

Распакуйте архив в удобное место, например: C:\Users\ВашеИмя\Desktop\PyQuest.

Откройте VS Code.

В VS Code выберите: File → Open Folder → укажите папку PyQuest.

💻 Шаг 2. Откройте терминал в VS Code
В VS Code нажмите Ctrl + ~ (тильда — клавиша слева от «1»).

Или через меню: Terminal → New Terminal.

Внизу откроется терминал. Убедитесь, что путь оканчивается на PyQuest:

text
PS C:\Users\ВашеИмя\Desktop\PyQuest>
Если путь другой — перейдите в папку проекта командой:

powershell
cd путь\к\папке\PyQuest
📦 Шаг 3. Установите зависимости
В терминале VS Code выполните:

Windows (PowerShell):

powershell
npm.cmd install
Windows (CMD) / macOS / Linux:

bash
npm install
⏳ Дождитесь окончания — это займёт 1–2 минуты. В конце появится строка вида added 1200 packages in 45s.

💡 Почему npm.cmd, а не npm?
В Windows PowerShell по умолчанию блокирует выполнение .ps1-скриптов, а команда npm — это как раз такой скрипт. Чтобы не настраивать политику безопасности, мы используем npm.cmd — CMD-версию команды. Она работает всегда.

🚀 Шаг 4. Запустите сервер
Выполните в терминале VS Code:

Windows (PowerShell):

powershell
$env:EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1; npx.cmd expo start --tunnel -c
Windows (CMD):

cmd
set EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1 && npx expo start --tunnel -c
macOS / Linux:

bash
EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1 npx expo start --tunnel -c
Что означает каждая часть команды
Часть	Зачем нужна
$env:EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1	Отключает проверку совместимости Expo SDK 57 с React Navigation (без неё приложение не запустится)
npx.cmd	Запускает Node-скрипты в обход блокировки PowerShell
expo start	Запускает Metro-сервер Expo
--tunnel	Создаёт туннель через интернет — работает, даже если телефон и компьютер находятся в разных сетях
-c	Очищает кэш сборщика (важно при первом запуске)
⏳ Что произойдёт дальше
1. При первом запуске появится вопрос:

text
The package @expo/ngrok@^4.1.0 is required to use tunnels.
Would you like to install it globally? (Y/n)
👉 Напишите y (латинскую) и нажмите Enter. Установка займёт 20–40 секунд.

2. Начнётся сборка:

text
Starting Metro Bundler
✔ Bundler cache is empty, rebuilding
3. Через 20–60 секунд появится QR-код и строки:

text
› Metro waiting on exp://xxxxx.exp.direct:80
› Scan the QR code above with Expo Go (Android) or the Camera app (iOS)
› Press Ctrl+C to exit
QR-код выглядит примерно так:

text
▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄▄
█ ▄▄▄▄▄ █▀▀█ ▄▄▄▄▄ █▀▀▄ █
█ █   █ █▀▄▀ █   █ █▀▄▀ █
...
⚠️ Не закрывайте терминал — пока сервер работает, телефон сможет загружать приложение.

📱 Шаг 5. Откройте приложение на телефоне
На Android
Откройте приложение Expo Go.

На главном экране найдите кнопку «Scan QR code».

Наведите камеру на QR-код в терминале VS Code.

Начнётся загрузка бандла (10–30 секунд).

Откроется зелёный экран с 🐍 PyQuest.

На iPhone (iOS)
Откройте стандартную камеру iPhone (не Expo Go).

Наведите на QR-код в терминале.

Сверху появится баннер «Open in Expo Go» — нажмите на него.

Если баннер не появился — откройте Expo Go вручную → «Scan QR code» → наведите на QR.

Через 10–30 секунд откроется приложение.

✅ Готово!
Вы увидите стартовый экран PyQuest:

🐍 Название приложения

📊 Три карточки: Кристаллы / Серия / Уроки

🟡 Жёлтую кнопку «Начать обучение 🚀»

Нажмите её — и попадёте на карту уроков.

🐛 Возможные проблемы и решения
❌ Ошибка невозможно загрузить файл ... npx.ps1
Причина: PowerShell блокирует выполнение скриптов.

Решение 1 — простое: используйте npm.cmd и npx.cmd вместо npm и npx.
Например, вместо npm install пишите npm.cmd install.

Решение 2 — навсегда:

Нажмите Win, наберите PowerShell, откройте его от имени администратора (правой кнопкой мыши → «Запуск от имени администратора»).

Выполните:

powershell
Set-ExecutionPolicy -Scope CurrentUser -ExecutionPolicy RemoteSigned
На вопрос ответьте Y и нажмите Enter.

Полностью закройте VS Code и откройте заново.

Теперь можно писать обычные npm install и npx expo start.

❌ Ошибка CommandError: Install @expo/ngrok@^4.1.0 and try again
Причина: при первом запуске с --tunnel Вы случайно ответили no на вопрос об установке @expo/ngrok.

Решение: запустите команду снова и ответьте y на вопрос.
Если вопрос больше не появляется — установите пакет вручную:

powershell
npm.cmd install --global @expo/ngrok
И запустите команду из Шага 4 снова.

❌ Ошибка expo-router is no longer compatible with react-navigation
Причина: в Expo SDK 57 по умолчанию идёт expo-router, который конфликтует с используемой навигацией.

Решение: убедитесь, что Вы используете полную команду из Шага 4 — с переменной EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1 в начале.

❌ Телефон долго грузит и показывает ошибку / синий экран «Something went wrong»
Причина 1: телефон и компьютер находятся в разных сетях (ПК по кабелю, телефон по Wi-Fi, но роутер блокирует соединение между устройствами).

Решение: используйте команду с флагом --tunnel — она работает через интернет, а не через локальную сеть.

Причина 2: кэш Expo Go на телефоне забит.

Решение: очистите кэш Expo Go:

Android: Настройки → Приложения → Expo Go → Память → «Очистить данные».

iOS: удалите Expo Go и установите заново из App Store.

После этого запустите команду из Шага 4 снова.

❌ Долго «висит» на Downloading JavaScript bundle
Причина: медленный интернет через туннель (это нормально при первом запуске).

Решение: подождите 1–2 минуты. Первая загрузка всегда дольше, потом бандл кэшируется.

Если через 5 минут ничего не произошло — остановите сервер (Ctrl+C) и запустите:

powershell
$env:EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1; npx.cmd expo start --tunnel -c
❌ Порт 8081 занят
Причина: уже запущен другой сервер Expo или Metro.

Решение: закройте все терминалы VS Code, откройте новый и запустите команду заново.

Либо откройте Диспетчер задач (Ctrl+Shift+Esc), найдите процессы Node.js и завершите их.

🔄 Как перезапустить сервер
Чтобы остановить сервер — нажмите Ctrl + C в терминале.

Чтобы запустить заново — выполните команду из Шага 4.

🌐 Альтернатива: запуск в браузере
Если телефона под рукой нет — после запуска сервера нажмите w в терминале VS Code.
Откроется браузер по адресу: http://localhost:8081

Чтобы увидеть мобильный вид: нажмите F12, затем Ctrl + Shift + M.

📌 Краткая шпаргалка
Все команды по порядку для Windows PowerShell:

powershell
# 1. Перейти в папку проекта
cd C:\Users\ВашеИмя\Desktop\PyQuest

# 2. Установить зависимости
npm.cmd install

# 3. Запустить сервер с туннелем
$env:EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1; npx.cmd expo start --tunnel -c

# 4. Когда появится QR — отсканируйте его в Expo Go на телефоне
Для macOS / Linux:

bash
cd ~/Desktop/PyQuest
npm install
EXPO_ROUTER_DISABLE_RN_NAVIGATION_CHECK=1 npx expo start --tunnel -c
💬 Если что-то не работает
Убедитесь, что все три шага (установка → запуск → сканирование) выполнены.

Проверьте, что телефон и компьютер имеют доступ в интернет.

Попробуйте команду с флагом -c (очистка кэша).

Если ошибка повторяется — пришлите скриншот терминала и скриншот экрана телефона.

Удачного запуска! 🐍🚀
