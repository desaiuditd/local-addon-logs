'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var path = require('path');

module.exports = function (context) {

    var Component = context.React.Component;
    var React = context.React;
    var $ = context.jQuery;

    return function (_Component) {
        _inherits(SiteInfoLogs, _Component);

        function SiteInfoLogs(props) {
            _classCallCheck(this, SiteInfoLogs);

            var _this = _possibleConstructorReturn(this, (SiteInfoLogs.__proto__ || Object.getPrototypeOf(SiteInfoLogs)).call(this, props));

            _this.getLog = _this.getLog.bind(_this);

            _this.showApacheAccess = _this.showApacheAccess.bind(_this);
            _this.showApacheError = _this.showApacheError.bind(_this);
            _this.showApacheVhosts = _this.showApacheVhosts.bind(_this);
            _this.showNginxAccess = _this.showNginxAccess.bind(_this);
            _this.showNginxError = _this.showNginxError.bind(_this);
            _this.showMysqlError = _this.showMysqlError.bind(_this);
            _this.showPhpError = _this.showPhpError.bind(_this);
            _this.showPhpFpm = _this.showPhpFpm.bind(_this);
            _this.showWpDebug = _this.showWpDebug.bind(_this);
            _this.showPMLog = _this.showPMLog.bind(_this);

            _this.siteID = this.props.params.siteID;
            _this.site = this.props.sites[_this.siteID];
            _this.viewTitle = 'Select a Log File';
            _this.activeView = false;

            this.site.path = this.site.path.replace('~/', context.environment.userHome + '/');

            _this.stylesheetPath = path.resolve(__dirname, '../style.css');
            _this.logPath = path.resolve(this.site.path, 'logs');
            _this.apacheClass = this.site.webServer === 'apache' ? '' : ' hiddenGroup';
            _this.nginxClass = this.site.webServer === 'nginx' ? '' : ' hiddenGroup';
            _this.pmClass = context.process.platform !== 'darwin' ? ' hiddenGroup' : '';
            return _this;
        }

        _createClass(SiteInfoLogs, [{
            key: 'getLog',
            value: function getLog(file, activeView) {
                var _logFile;

                if(activeView === 'pmLog') {
                    _logFile = path.resolve(context.environment.userHome, 'Library/Logs/local-by-flywheel.log');
                } else if(activeView === 'wpDebug') {
                    _logFile = path.resolve( this.site.path, 'app/public/app/debug.log' );
                } else {
                    _logFile = path.resolve(this.logPath, file);
                }
                var _monitor = $('.' + activeView);
                this.forceUpdate();

                _monitor.text('');

                var reader = require('fs-reader');
                reader(_logFile, -25, function(err, contents) {
                    if(err) throw err;

                    contents.split("\n").map(function (line) {
                        if(line !== '... <<< more >>>' && line !== '') {
                            _monitor.append(line + "<br /><br />");
                            _monitor.scrollTop(_monitor[0].scrollHeight);
                        }
                    });
                });

                var ft = require('file-tail').startTailing(_logFile);
                ft.on('line', function(line) {
                    _monitor.append(line + "<br /><br />");
                    _monitor.scrollTop(_monitor[0].scrollHeight);
                });
            }
        }, {
            key: 'showApacheAccess',
            value: function showApacheAccess() {
                this.viewTitle = 'Apache Access Log';
                this.activeView = 'apacheAccess';
                this.getLog('apache/access.log', this.activeView);
            }
        }, {
            key: 'showApacheError',
            value: function showApacheError() {
                this.viewTitle = 'Apache Error Log';
                this.activeView = 'apacheError';
                this.getLog('apache/error.log', this.activeView);
            }
        }, {
            key: 'showApacheVhosts',
            value: function showApacheVhosts() {
                this.viewTitle = 'Apache VHosts Log';
                this.activeView = 'apacheVhosts';
                this.getLog('apache/other_vhosts_access.log', this.activeView);
            }
        }, {
            key: 'showNginxAccess',
            value: function showNginxAccess() {
                this.viewTitle = 'Nginx Access Log';
                this.activeView = 'nginxAccess';
                this.getLog('nginx/access.log', this.activeView);
            }
        }, {
            key: 'showNginxError',
            value: function showNginxError() {
                this.viewTitle = 'Nginx Error Log';
                this.activeView = 'nginxError';
                this.getLog('nginx/error.log', this.activeView);
            }
        }, {
            key: 'showMysqlError',
            value: function showMysqlError() {
                this.viewTitle = 'MySQL Error Log';
                this.activeView = 'mysqlError';
                this.getLog('mysql/error.log', this.activeView);
            }
        }, {
            key: 'showPhpError',
            value: function showPhpError() {
                this.viewTitle = 'PHP Error Log';
                this.activeView = 'phpError';
                this.getLog('php/' + this.site.phpVersion + '/error.log', this.activeView);
            }
        }, {
            key: 'showPhpFpm',
            value: function showPhpFpm() {
                this.viewTitle = 'PHP FPM Log';
                this.activeView = 'phpFpm';
                this.getLog('php/' + this.site.phpVersion + '/php-fpm.log', this.activeView);
            }
        }, {
            key: 'showWpDebug',
            value: function showWpDebug() {
                this.viewTitle = 'WordPress Debug Log';
                this.activeView = 'wpDebug';
                this.getLog('php/' + this.site.phpVersion + '/php-fpm.log', this.activeView);
            }
        }, {
            key: 'showPMLog',
            value: function showPMLog() {
                this.viewTitle = 'Local by Flywheel Log';
                this.activeView = 'pmLog';
                this.getLog(false, this.activeView);
            }
        }, {
            key: 'render',
            value: function render() {
                return React.createElement(
                    'div',
                    { className: 'logs-container' },
                    React.createElement('link', { rel: 'stylesheet', href: this.stylesheetPath }),
                    React.createElement(
                        'div',
                        { className: 'wrapper' },
                        React.createElement(
                            'div',
                            { className: 'logview' },
                            React.createElement(
                                'h4',
                                { className: 'padded-horizontally-more', style: { marginTop: 0 } },
                                this.viewTitle
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'apacheAccess' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor apacheAccess' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'apacheError' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor apacheError' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'apacheVhosts' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor apacheVhosts' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'nginxAccess' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor nginxAccess' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'nginxError' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor nginxError' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'mysqlError' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor mysqlError' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'phpError' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor phpError' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'phpFpm' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor phpFpm' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'wpDebug' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor wpDebug' }
                            ),
                            React.createElement(
                                'div',
                                { style: { display: this.activeView === 'pmLog' ? 'block' : 'none' },
                                    className: 'padded-horizontally-more logview-monitor pmLog' }
                            )
                        ),
                        React.createElement(
                            'div',
                            { className: 'toolbar toolbar-footer' },
                            React.createElement(
                                'div',
                                { className: 'toolbar-title' },
                                'Logs:'
                            ),
                            React.createElement(
                                'div',
                                { className: 'toolbar-actions' },
                                React.createElement(
                                    'div',
                                    { className: 'btn-group' + this.apacheClass },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'apacheAccess',
                                            onClick: this.showApacheAccess },
                                        'Apache Access'
                                    ),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'apacheError',
                                            onClick: this.showApacheError },
                                        'Error'
                                    ),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'apacheVhosts',
                                            onClick: this.showApacheVhosts },
                                        'VHosts'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-group' + this.nginxClass },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'nginxAccess',
                                            onClick: this.showNginxAccess },
                                        'Nginx Access'
                                    ),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'nginxError',
                                            onClick: this.showNginxError },
                                        'Error'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-group' },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'mysqlError',
                                            onClick: this.showMysqlError },
                                        'MySQL Error'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-group' },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'phpError',
                                            onClick: this.showPhpError },
                                        'PHP Error'
                                    ),
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'phpFpm',
                                            onClick: this.showPhpFpm },
                                        'FPM'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-group' },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-default btn-small',
                                            disabled: this.activeView && this.activeView === 'wpDebug',
                                            onClick: this.showWpDebug },
                                        'WP Debug'
                                    )
                                ),
                                React.createElement(
                                    'div',
                                    { className: 'btn-group' + this.pmClass },
                                    React.createElement(
                                        'button',
                                        { className: 'btn btn-primary btn-small',
                                            disabled: this.activeView && this.activeView === 'pmLog',
                                            onClick: this.showPMLog },
                                        'Local by Flywheel'
                                    )
                                )
                            )
                        )
                    )
                );
            }
        }]);

        return SiteInfoLogs;
    }(Component);
};
