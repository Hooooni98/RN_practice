# RN_PRACTICE
###### react native install, setting, basic sturcture for mac

#### 1. install Homebrew
    brew --version          # check version

    # install brew
    /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"

#### 2. install Nodejs
    node --version          # check version

    brew install node       # insatll node
    npm --version           # check npm

#### 3. insatll Watchman
    [ File change detection ]
    brew install watchman   # insatll watchman
    watchman -–version       # check version

#### 4. install React Native CLI
    # install react native cli
    npm install -g react-native-cli
    npm install -g react-native

    # check version
    npx react-native -version

#### 5. insatll Xcode & Cocoapods
    # Xcode download link
    [Xcode download link](https://apps.apple.com/us/app/xcode/id497799835?mt=12)
    1. Execution Xcode
    2. set cli
    Xcode > Preferences > Locations > Command Line Tools > latest

    [ Cocoapods : Dependency Manager for iOS ]
    # install cocoapods
    brew install cocoapods
    sudo arch -x86_64 gem install ffi
    # check version
    pod --version

#### 6. install JDK & Android studio
    # install JDK
    go to link download java 11
    https://www.oracle.com/kr/java/technologies/downloads/#java11

    # check version
    java -version

    # Android studio download link
    https://developer.android.com/studio
    1. select install type
    - custom
    2. SDK Component Setup
    - check Android Virtual Device
    3. Execution Android studio
    - More Actions > SDK Manager > Show Package Details(right-bottom)
        # select Android 12.0 (S), or any
        # check below details
        Android SDK Platform 31
        Source for Android 31
        Intel x86 Atom System Image
        Google APIs Intel x86 Atom System Image
        Google APIs Intel x86 Atom_64 System Image
    4. set environment variables
        vim ~/.zshrc     or     vim ~/.bashrc
        echo $HOME                      # check HOME path
        export HOME=/Users/user_name    # set HOME path if not setting

        # write down below contents
        export ANDROID_HOME=$HOME/Library/Android/sdk
        export PATH=$PATH:$ANDROID_HOME/emulator
        export PATH=$PATH:$ANDROID_HOME/tools
        export PATH=$PATH:$ANDROID_HOME/tools/bin
        export PATH=$PATH:$ANDROID_HOME/platform-tools

        source ~/.zshrc     or     source ~/.bashrc
    5. check android settings
        # open new terminal and write down below command
        adb
        # then you see this
        Android Debug Bridge version 1.0.41
        Version 33.0.3-8952118
        Installed as /<sdk path>/platform-tools/adb

#### 7. make and check React-Native project
    sudo xcode-select --switch /Applications/Xcode.app
    sudo xcodebuild -license accept
    sudo xcode-select --switch /Library/Developer/CommandLineTools
    ruby -rrbconfig -e 'puts RbConfig::CONFIG["rubyhdrdir"]'
    sudo gem install -n /usr/local/bin cocoapods
    sudo gem install cocoapods --pre

    ## init project
    $ npx react-native init YourProject
    
    # if you got a cocoapods dependency error
    cd ./YourProject/ios && arch -x86_64 pod install

    # excution
    npx react-native run-ios
    npx react-native run-android

    # error
    [ ios ]
    - No bundle URL present with ios
    $ rm -rf ios/build/; kill $(lsof -t -i:8081); react-native run-ios
    $ echo "alias rn-ios=\"kill \$(lsof -t -i:8081); rm -rf ios/build/; react-native run-ios\"" >> ~/.zshrc; source ~/.zshrc

    [ android ]
    $ chmod 755 android/gradlew
    - Execution failed for task ':app:installDebug'
        1. execute android studio
        2. More Actions > Virtual Device Manager > right tap > cold Boot Now
 

#### 8. set vscode extension
    https://tolovefeels.tistory.com/entry/Visual-Studio-Code-에서-React-개발환경에-필요한-확장-프로그램