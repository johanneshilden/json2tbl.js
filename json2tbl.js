var json2tbl = (function(){

    function skeys(item) {
        return Object.keys(item).sort();
    }

    function isHgList(items) {
        var keys = null;
        for (i = 0; i < items.length; i++) {
            var item = items[i];
            if (!(item instanceof Object)) {
                return false;
            }
            if (!keys) {
                keys = skeys(item);
            } else {
                var keys_ = skeys(item);
                if (keys.toString() !== keys_.toString()) {
                    return false;
                }
            }
        }
        return true;
    }

    function build(json, config) {

        var elem = function(n) { return document.createElement(n); },
            text = function(n) { 
                if (n instanceof Object) {
                    n = JSON.stringify(n);
                }
                return document.createTextNode(n); 
            };

        if (json instanceof Array) {

            if (!json.length) {
                return text('');
            }

            var table = elem('table'),
                tbody = elem('tbody');

            if (config && config.cssClass) {
                table.className = config.cssClass;
            }
 
            if (isHgList(json)) {

                for (i = 0; i < json.length; i++) {

                    var obj = json[i];

                    if (0 == i) {

                        var thead = elem('thead'),
                            tr = elem('tr');

                        for (key in obj) {
                            var th = elem('th');
                            th.appendChild(text(key));
                            tr.appendChild(th);
                        }

                        table.appendChild(thead);
                        thead.appendChild(tr);

                    }

                    var tr = elem('tr');

                    for (key in obj) {
                        var td = elem('td');
                        td.appendChild(build(obj[key]));
                        tr.appendChild(td);
                    }
                    
                    tbody.appendChild(tr);
                }

            } else {
                for (i = 0; i < json.length; i++) {

                    var item = json[i],
                        tr = elem('tr'),
                        td = elem('td');

                    td.appendChild(build(item));
                    tr.appendChild(td);
                    tbody.appendChild(tr);
                }
            }

            table.appendChild(tbody);
            return table;

        } else if (json instanceof Object) {

            if (!(Object.keys(json).length)) {
                return text('');
            }

            var table = elem('table'),
                tbody = elem('tbody');

            if (config && config.cssClass) {
                table.className = config.cssClass;
            }
 
            for (key in json) {
                
                var tr = elem('tr'), 
                    t1 = elem('td'), 
                    t2 = elem('td');

                t1.appendChild(text(key));
                t2.appendChild(text(json[key]));

                tr.appendChild(t1);
                tr.appendChild(t2);

                tbody.appendChild(tr);
            }

            table.appendChild(tbody);
            return table;

        } else {
            return text(json);
        }
    }

    // ~ public
    return {
        build : build
    };

}());
