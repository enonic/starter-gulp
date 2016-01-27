$(function () {
    var Menu = {

        init: function () {
            this.body = $('body');
            this.toggleBtn = this.body.find('.page-header__nav-trigger');
            this.menu = $('#page-header__nav-menu');
            this.menuVisible = false;
            this.bindEvents();
        },

        // Bind events
        bindEvents: function () {
            this.bindToggleBtnClick();
            this.bindBackdropClick();
            this.bindEscClick();
        },

        // Show the menu
        showMenu: function () {
            this.menu.addClass('page-header__nav-menu--active');
            this.toggleBtn.addClass('page-header__nav-trigger--active');
            this.toggleBtn.attr('aria-expanded', 'true');
            this.menuVisible = true;
        },

        // Hide the menu
        hideMenu: function () {
            this.menu.removeClass('page-header__nav-menu--active');
            this.toggleBtn.removeClass('page-header__nav-trigger--active');
            this.toggleBtn.attr('aria-expanded', 'false');
            this.menuVisible = false;
        },

        // Click on toggle button
        bindToggleBtnClick: function () {
            this.toggleBtn.on('click', $.proxy(function (e) {
                e.preventDefault();
                if (this.menuVisible) {
                    this.hideMenu();
                }
                else {
                    this.showMenu();
                }
            }, this));
        },

        // Click outside of menu
        bindBackdropClick: function () {
            $(document).on('click', $.proxy(function (e) {
                var clickIsOnMenuContent = $(e.target).closest(this.menu.find('a, form')).length;
                var clickIsOnToggleBtn = $(e.target).closest(this.toggleBtn).length;
                if (this.menuVisible && !clickIsOnMenuContent && !clickIsOnToggleBtn) {
                    this.hideMenu();
                }
            }, this));
        },

        // Click on ESC button
        bindEscClick: function () {
            $(document).on('keyup', $.proxy(function (e) {
                if (e.keyCode === 27) {
                    this.hideMenu();
                }
            }, this));
        }
    };

    Menu.init();
});