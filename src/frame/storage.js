
// 兼容处理
if (!window.localStorage) {
    Object.defineProperty(window, 'localStorage', new (function () {
        var aKeys = [],
            oStorage = {};
        Object.defineProperty(oStorage, 'getItem', {
            value: function (sKey) {
                return sKey ? this[sKey] : null;
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'key', {
            value: function (nKeyId) {
                return aKeys[nKeyId];
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'setItem', {
            value: function (sKey, sValue) {
                if (!sKey) {
                    return;
                }
                document.cookie = escape(sKey) + '=' + escape(sValue) + '; path=/';
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'length', {
            get: function () {
                return aKeys.length;
            },
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'removeItem', {
            value: function (sKey) {
                if (!sKey) {
                    return;
                }
                var sExpDate = new Date();
                sExpDate.setDate(sExpDate.getDate() - 1);
                document.cookie = escape(sKey) + '=; expires=' + sExpDate.toGMTString() + '; path=/';
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        this.get = function () {
            var iThisIndx;
            for (var sKey in oStorage) {
                if (sKey) {
                    iThisIndx = aKeys.indexOf(sKey);
                    if (iThisIndx === -1) {
                        oStorage.setItem(sKey, oStorage[sKey]);
                    } else {
                        aKeys.splice(iThisIndx, 1);
                    }
                    delete oStorage[sKey];
                }
            }
            for (aKeys; aKeys.length > 0; aKeys.splice(0, 1)) {
                oStorage.removeItem(aKeys[0]);
            }
            for (var iCouple, iKey, iCouplId = 0, aCouples = document.cookie.split(/\s*;\s*/); iCouplId < aCouples.length; iCouplId++) {
                iCouple = aCouples[iCouplId].split(/\s*=\s*/);
                if (iCouple.length > 1) {
                    oStorage[iKey = unescape(iCouple[0])] = unescape(iCouple[1]);
                    aKeys.push(iKey);
                }
            }
            return oStorage;
        };
        this.configurable = false;
        this.enumerable = true;
    })());
}

// IE  低版本实现兼容
if (!window.localStorage) {
    window.localStorage = {
        getItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return null;
            }
            return unescape(document.cookie.replace(new RegExp('(?:^|.*;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=\\s*((?:[^;](?!;))*[^;]?).*'), '$1'));
        },
        key: function (nKeyId) {
            return unescape(document.cookie.replace(/\s*\=(?:.(?!;))*$/, '').split(/\s*\=(?:[^;](?!;))*[^;]?;\s*/)[nKeyId]);
        },
        setItem: function (sKey, sValue) {
            if (!sKey) {
                return;
            }
            document.cookie = escape(sKey) + '=' + escape(sValue) + '; path=/';
            this.length = document.cookie.match(/\=/g).length;
        },
        length: 0,
        removeItem: function (sKey) {
            if (!sKey || !this.hasOwnProperty(sKey)) {
                return;
            }
            var sExpDate = new Date();
            sExpDate.setDate(sExpDate.getDate() - 1);
            document.cookie = escape(sKey) + '=; expires=' + sExpDate.toGMTString() + '; path=/';
            this.length--;
        },
        hasOwnProperty: function (sKey) {
            return (new RegExp('(?:^|;\\s*)' + escape(sKey).replace(/[\-\.\+\*]/g, '\\$&') + '\\s*\\=')).test(document.cookie);
        }
    };
    window.localStorage.length = (document.cookie.match(/\=/g) || window.localStorage).length;
}


// 缓存处理
if (!window.cacheStorage) {
    Object.defineProperty(window, 'cacheStorage', new (function () {
        var aKeys = [],
            oStorage = {};
        Object.defineProperty(oStorage, 'getItem', {
            value: function (sKey) {
                return sKey ? this[sKey] : null;
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'key', {
            value: function (nKeyId) {
                return aKeys[nKeyId];
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'setItem', {
            value: function (sKey, sValue) {
                if (!sKey) {
                    return;
                }
                this[sKey] = sValue;
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'length', {
            get: function () {
                return aKeys.length;
            },
            configurable: false,
            enumerable: false
        });
        Object.defineProperty(oStorage, 'removeItem', {
            value: function (sKey) {
                if (!sKey) {
                    return;
                }
                delete this[sKey];
            },
            writable: false,
            configurable: false,
            enumerable: false
        });
        this.get = function () {
            return oStorage;
        };
        this.configurable = false;
        this.enumerable = true;
    })());
}

var oStorage = {};
var timeoutFlag = '@@_timeoutFlag_';
var dateFlag = '@@_dateFlag_';
Object.defineProperty(oStorage, 'TYPE', {
    value: {LOCAL: 'LOCAL', SESSION: 'SESSION', CACHE: 'CACHE'},
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(oStorage, 'setItem', {
    value: function (sKey, sValue, sType, nTimeout) {
        if (!sKey || !sValue) {
            return;
        }
        var _sType, _nTimeout = nTimeout;
        if (typeof sType === 'number') {
            _nTimeout = sType;
            _sType = this.TYPE.LOCAL;
        } else {
            _sType = sType ? sType : this.TYPE.LOCAL;
        }
        _sType = _sType.toLowerCase();
        var _storage = window[_sType + 'Storage'];
        if (!_storage) {
            return;
        }
        var _sValue = sType === this.TYPE.CACHE ? sValue : JSON.stringify(sValue);
        _storage.setItem(sKey, _sValue);
        if (_nTimeout) {
            _storage.setItem(timeoutFlag + sKey, _nTimeout);
            var time = new Date();
            _storage.setItem(dateFlag + sKey, time.getTime());
        }
    },
    writable: false,
    configurable: false,
    enumerable: false
});


Object.defineProperty(oStorage, 'getItem', {
    value: function (sKey, sType) {
        if (!sKey) {
            return undefined;
        }
        var _sType = sType ? sType : this.TYPE.LOCAL;
        _sType = _sType.toLowerCase();
        var _storage = window[_sType + 'Storage'];
        if (!_storage) {
            return undefined;
        }
        var timeOut = timeoutFlag + sKey;
        timeOut = _storage.getItem(timeOut);
        var dateValue = dateFlag + sKey;
        dateValue = _storage.getItem(dateValue);
        var result;
        if (timeOut && dateValue) {
            var date = new Date();
            dateValue = parseInt(dateValue, 10);
            timeOut = parseInt(timeOut, 10);
            var bIsTimeOut = date.getTime() - dateValue > timeOut;
            if (bIsTimeOut) {
                this.removeItem(sKey, _sType);
                return undefined;
            }
        }
        result = _storage.getItem(sKey);

        result = sType !== this.TYPE.CACHE && result ? JSON.parse(result) : result;

        return result;
    },
    writable: false,
    configurable: false,
    enumerable: false
});

Object.defineProperty(oStorage, 'removeItem', {
    value: function (sKey, sType) {
        if (!sKey) {
            return;
        }
        var _sType = sType ? sType : this.TYPE.LOCAL;
        _sType = _sType.toLowerCase();
        var _storage = window[_sType + 'Storage'];
        if (!_storage) {
            return;
        }
        _storage.removeItem(sKey);
        _storage.removeItem(timeoutFlag + sKey);
        _storage.removeItem(dateFlag + sKey);
    },
    writable: false,
    configurable: false,
    enumerable: false
});

export const Storage = oStorage ;
 
