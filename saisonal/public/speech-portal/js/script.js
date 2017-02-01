$(document).ready(function() {

    var $textForm = $('#text-form'),
        $commandInput = $('#text-command', $textForm);


    var chatServices = new Array();
    chatServices.push(new ApiSpeechService($('#api-box')));
    chatServices.push(new WitSpeechService($('#wit-box')));


    /*
    * SINGLE INPUT
    * */
    $textForm.on('submit', function(e) {
        e.preventDefault();

        var command = $commandInput.val();

        if (command != '') {
            $commandInput.val('');

            for (var chatService of chatServices) {
                chatService.query(command);
            }
        }
    });



    /*
    * TEST SERIES
    * */
    var $labelSrc = $('#label-src'),
        $table = $('#test-series tbody'),
        $tableRowSrc = $('#test-entry-src-row', $table),
        testArr = new Array(),
        $btnStartAllTests = $('#start-all-tests'),
        performedTestsCount = 0;
    $labelSrc[0].removeAttribute('id');


    function syntaxHighlight(json) {
        if (typeof json != 'string') {
            json = JSON.stringify(json, undefined, 2);
        }

        json = json
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/\n/g, '<br/>')
            .replace(/\s/g, '&nbsp;');

        return json.replace(/("(\\u[a-zA-Z0-9]{4}|\\[^u]|[^\\"])*"(\s*:)?|\b(true|false|null)\b|-?\d+(?:\.\d*)?(?:[eE][+\-]?\d+)?)/g, function (match) {
            var cls = 'number';
            if (/^"/.test(match)) {
                if (/:$/.test(match)) {
                    cls = 'key';
                } else {
                    cls = 'string';
                }
            } else if (/true|false/.test(match)) {
                cls = 'boolean';
            } else if (/null/.test(match)) {
                cls = 'null';
            }

            return '<span class="' + cls + '">' + match + '</span>';
        });
    }

    function addServiceLabelsTo($elem) {
        for (var k = 0; k < chatServices.length; k++) {
            var name = chatServices[k].getName();
            var $label = $($labelSrc.clone());
            $label.attr('data-service', name)
            $label.text(name);
            $elem.append($label);
        }
    }

    function markLabel($label, success) {
        var className = (success ? 'label-success' : 'label-danger');
        $label.removeClass('label-default');
        $label.addClass(className);
    }

    function initializeTable(entries) {
        for (var i = 0; i < entries.length; i++) {
            var entry = entries[i];

            var $row = $tableRowSrc.clone().removeClass('hidden'),
                $entryNo = $('.entry-no', $row),
                $entryText = $('.entry-text', $row),
                $entryAction = $('.entry-action', $row),
                $entryParams = $('.entry-parameters', $row),
                $entryResp = $('.entry-plain-response', $row),
                $entryJson = $('.entry-json-response', $row);

            $row.data('test-nr', i);
            $entryNo.html(i + 1);
            $entryText.text(entry.text);
            $entryAction.text(entry.action);
            addServiceLabelsTo($entryAction);


            var params = entry.parameters;
            for (var j = 0; j < params.length; j++) {
                var $param = $('<p data-param-name="' + params[j].name + '" data-param-value="' + params[j].value + '">' + params[j].name + ': ' + params[j].value + '</p>');
                addServiceLabelsTo($param);
                $entryParams.append($param);
            }

            $('a', $entryResp).attr('href', '#entry-row-' + i + 1);
            $('.collapsing-content', $entryResp).attr('id', 'entry-row-' + i + 1);

            $table.append($row);
            testArr.push({
                nr: i,
                text: entry.text,
                action: entry.action,
                params: entry.parameters,
                elem: {
                    $row: $row,
                    $entryNo: $entryNo,
                    $entryText: $entryText,
                    $entryAction: $entryAction,
                    $entryParams: $entryParams,
                    $entryResp: $entryResp,
                    $entryJson: $entryJson
                }
            });
        }
    }

    function performTest(test) {
        var command = test.text;

        for (var i = 0; i < chatServices.length; i++) {
            var chatService = chatServices[i];
            let serviceName = chatService.getName();

            chatService.query(command).then(
                function (data) {
                    test.elem.$row.removeClass('active');



                    let $actionLabel = $('[data-service="' + serviceName + '"]', test.elem.$entryAction);
                    try {
                        markLabel($actionLabel, (test.action == data.response.result.action));
                    } catch (e) { markLabel($actionLabel, false); }

                    for (var i = 0; i < test.params.length; i++) {
                        let paramName = test.params[i].name,
                            paramValue = test.params[i].value;

                        let $paramLabel = $('[data-param-name="' + paramName + '"] .label[data-service="' + serviceName + '"]', test.elem.$entryParams);

                        try {
                            console.log(paramName, data.response.result.parameters[paramName], paramName == data.response.result.parameters[paramName]);
                            markLabel($paramLabel, (paramName == data.response.result.parameters[paramName]));
                        } catch (e) {markLabel($paramLabel, false); }
                    }

                    var $resp = $('<div>');
                    $resp.append($('<h3>').text(serviceName));
                    $resp.append($('<div>').html(syntaxHighlight(data)));
                    test.elem.$entryJson.append($resp);


                    if (++performedTestsCount == chatServices.length * testArr.length) {
                        performedTestsCount = 0;
                        $btnStartAllTests.removeClass('disabled');
                    }

                }, function (err) {
                    console.log(err);
                }
            );
        }
    }

    function performAllTests() {
        for (var i = 0; i < testArr.length; i++) {
            performTest(testArr[i]);
            testArr[i].elem.$row.addClass('active');
        }
    }

    $btnStartAllTests.on('click', function(e) {
        e.preventDefault();
        $(this).addClass('disabled');
        performAllTests();
    });

    $.ajax({
        url: '/speech-portal/test/testcases.json'
    }).then(function(data) {
        initializeTable(data);
    });
});