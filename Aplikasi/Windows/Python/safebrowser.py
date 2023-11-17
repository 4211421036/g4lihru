import sys
from PyQt5.QtCore import *
from PyQt5.QtWidgets import *
from PyQt5.QtWebEngineWidgets import *
from urllib.parse import urlparse
from PyQt5.QtGui import QCursor

class Browser(QMainWindow):
    def __init__(self):
        super(Browser, self).__init__()

        # Set up the navigation bar
        navbar = QToolBar()
        self.addToolBar(navbar)
        self.contextMenu = QMenu(self)

        # Back Button
        back_btn = QAction("Back", self)
        back_btn.setStatusTip("Back to the previous page")
        back_btn.triggered.connect(self.navigate_back)
        navbar.addAction(back_btn)

        # Forward Button
        forward_btn = QAction("Forward", self)
        forward_btn.setStatusTip("Forward to the next page")
        forward_btn.triggered.connect(self.navigate_forward)
        navbar.addAction(forward_btn)

        # Reload Button
        reload_btn = QAction("Reload", self)
        reload_btn.setStatusTip("Reload the page")
        reload_btn.triggered.connect(self.reload_page)
        navbar.addAction(reload_btn)

        # Home Button
        home_btn = QAction("Home", self)
        home_btn.setStatusTip("Go home")
        home_btn.triggered.connect(self.navigate_home)
        navbar.addAction(home_btn)

        # URL Bar
        self.url_bar = QLineEdit()
        self.url_bar.returnPressed.connect(self.navigate_to_url)
        navbar.addWidget(self.url_bar)

        # Update URL bar
        self.url_bar.selectionChanged.connect(self.copy_link_action)

        # Set the central widget
        self.tab_widget = QTabWidget()
        self.setCentralWidget(self.tab_widget)

        # Add the first tab
        self.add_tab("https://www.google.com")

        # Status bar
        status_bar = QStatusBar()
        self.setStatusBar(status_bar)

        # Set window properties
        self.showMaximized()
        self.setWindowTitle("Secure Browser")

    def add_tab(self, url):
        browser = QWebEngineView()
        browser.setUrl(QUrl(url))
        index = self.tab_widget.addTab(browser, "New Tab")

        # Connect the slot for URL changes in the new tab
        browser.urlChanged.connect(lambda qurl: self.update_urlbar(qurl, browser))


        # Set the current tab to the newly added tab
        self.tab_widget.setCurrentIndex(index)

    def navigate_home(self):
        self.current_browser().setUrl(QUrl("https://www.google.com"))

    def navigate_back(self):
        self.current_browser().back()

    def navigate_forward(self):
        self.current_browser().forward()

    def reload_page(self):
        self.current_browser().reload()

    def navigate_to_url(self):
        url = self.url_bar.text()
        parsed_url = urlparse(url)

        if parsed_url.scheme == '' or parsed_url.netloc == '':
            # Invalid URL, handle accordingly
            QMessageBox.warning(self, "Invalid URL", "Please enter a valid URL.")
        else:
            self.current_browser().setUrl(QUrl(url))

    def update_urlbar(self, qurl, browser):
        # Update the URL bar with the current URL
        self.url_bar.setText(qurl.toString())
        self.url_bar.setCursorPosition(0)

        # Set the focus on the current tab's browser
        self.tab_widget.setCurrentWidget(browser)


    def contextMenuEvent(self, event):
        menu = QMenu(self)
        new_tab_action = QAction("Open Link in New Tab", self)
        new_tab_action.triggered.connect(self.open_link_in_new_tab)
        menu.addAction(new_tab_action)
        menu.exec_(event.globalPos())

    def open_link_in_new_tab(self):
        link_url = self.url_bar.selectedText()  # Mengambil URL dari teks yang terpilih di URL bar
        if link_url:
            self.add_tab(link_url)


    def copy_link_action(self):
        selected_text = self.url_bar.selectedText()
        if selected_text:
            copy_link_action = self.contextMenu.addAction("Copy Link Address")
            copy_link_action.triggered.connect(self.copy_link_address)
            self.contextMenu.exec_(QCursor.pos())  # Menampilkan menu pada posisi kursor

    def copy_link_address(self):
        selected_text = self.url_bar.selectedText()
        if selected_text:
            QApplication.clipboard().setText(selected_text)

    def current_browser(self):
        return self.tab_widget.currentWidget()

if __name__ == "__main__":
    app = QApplication(sys.argv)
    QApplication.setApplicationName("Secure Browser")
    window = Browser()
    window.show()
    sys.exit(app.exec_())
