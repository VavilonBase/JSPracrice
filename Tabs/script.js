const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tabContent');

if (tabs.length != tabContents.length) {
    console.log('tabs.lenght < tabContents.lenght');
}
else {
    for (let i = 0; i < tabs.length; i++) {
        tabs[i].onclick = OnClickTab(tabs[i], tabContents[i]);
    };
}

function OnClickTab(tab, tabContent) {
    return () => {
        if (tabContent.classList.contains('hide')) {
            CloseTabsAndTabContents();
            tab.classList.add('whiteborder');
            tabContent.classList.remove('hide');
            tabContent.classList.add('show');
        }
    };
}

function CloseTabsAndTabContents() {
    for (let i = 0; i < tabs.length; i++) {
        tabContents[i].classList.remove('show');
        tabContents[i].classList.add('hide')
        tabs[i].classList.remove('whiteborder');
    };
}