📥 Шаг 1. Скачайте проект
Вариант А — через Git (если он у Вас установлен)
Откройте терминал и выполните:

bash
git clone https://github.com/kostolllon/PyQuest.git
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
