/**
 * Dataviz Rates
 */
var rates = (function () {
    console.info('main.js');

    function getStartDate() {
        var pattern = /^(\d{2})\/(\d{2})\/(\d{4})$/,
            array_date = $("#startDate").val().match(pattern);
        return new Date(array_date[3], array_date[2] - 1, array_date[1]);
    }

    function initiateDate() {
        var today = new Date();
        var date_string = toDateString(today);
        $("#startDate").val(date_string);
        console.info("Today is ", date_string)
    }

    function plusDate(start_date, plus_month, plus_year) {
        if (!start_date) return false;
        var tmp_date = new Date(start_date.valueOf());
        if (plus_month) {
            plus_month = parseInt(plus_month);
            tmp_date.setMonth(tmp_date.getMonth() + plus_month);
        }
        if (plus_year) {
            plus_year = parseInt(plus_year);
            tmp_date.setFullYear(tmp_date.getFullYear() + plus_year);
        }
        if (tmp_date.getDate() != start_date.getDate()) {
            tmp_date.setDate(1);
        }
        return new Date(tmp_date.valueOf());
    }

    function constructTable() {
        var template = $('#template-table-row').html();
        Mustache.parse(template);
        var data = [
            {m: "3", t: "3m", t_full: "3 months", rate_a: "2.50", rate_b: "3.50"},
            {m: "6", t: "6m", t_full: "6 months", rate_a: "2.60", rate_b: "3.60"},
            {m: "9", t: "9m", t_full: "9 months", rate_a: "2.65", rate_b: "3.65"},
            {y: "1", t: "1", t_full: "1 year", rate_a: "2.70", rate_b: "3.70"},
            {y: "2", t: "2", t_full: "2 years", rate_a: "3.20", rate_b: "4.20"},
            {y: "3", t: "3", t_full: "3 years", rate_a: "3.60", rate_b: "4.60"},
            {y: "4", t: "4", t_full: "4 years", rate_a: "3.90", rate_b: "4.90"},
            {y: "5", t: "5", t_full: "5 years", rate_a: "4.20", rate_b: "5.20"},
            {y: "6", t: "6", t_full: "6 years", rate_a: "4.70", rate_b: "5.70"},
            {y: "7", t: "7", t_full: "7 years", rate_a: "5.30", rate_b: "6.30"},
            {y: "8", t: "8", t_full: "8 years", rate_a: "5.60", rate_b: "6.60"},
            {y: "9", t: "9", t_full: "9 years", rate_a: "5.60", rate_b: "6.60"},
            {y: "10", t: "10", t_full: "10 years", rate_a: "5.60", rate_b: "6.60"}
        ];
        var rendered = data.map(function (t) {
            return Mustache.render(template, t);
        });
        rendered.forEach(function (e) {
            $('#tableA tbody').append(e);
        });
    }

    function updateTable() {
        var start_date = getStartDate(),
            previous_date,
            previous_DF_sum = {a: 0, b: 0},
            previous_DF_mul_days_sum = {a: 0, b: 0};
        $('#tableA tbody tr').each(function () {
            var $this = $(this);
            var m = $this.data('m'),
                y = $this.data('y');
            m = m ? parseInt(m) : 0;
            y = y ? parseInt(y) : 0;

            /**
             *  Calculate "#days"
             */
            var days = 0,
                elapsed_days = 0;
            var date = plusDate(start_date, m, y);
            $this.find('.days').attr('title', toDateString(date));
            $this.data('date', date);
            total_days = parseInt((date.getTime() - start_date.getTime()) / 1000 / 3600 / 24);

            if (m || y == 1) {
                days = total_days;
            } else if (y) {
                days = parseInt((date.getTime() - previous_date.getTime()) / 1000 / 3600 / 24);
            }
            $this.find('.days').text(days);
            previous_date = date;

            /**
             * Calculate DF
             */
            var options = getOptions();
            var DF = {a: 0, b: 0},
                rates = {
                    a: validatePercentage($this.find('.rate.a').val()),
                    b: validatePercentage($this.find('.rate.b').val())
                };
            if (m) {
                // money rates
                DF['a'] = calculateMoneyDF(rates['a'], days, options.a.money);
                DF['b'] = calculateMoneyDF(rates['b'], days, options.b.money);
            } else if (y) {
                // swap rates
                DF['a'] = calculateSwapDF(rates['a'], days, previous_DF_sum['a'], previous_DF_mul_days_sum['a'], options.a.swap);
                DF['b'] = calculateSwapDF(rates['b'], days, previous_DF_sum['b'], previous_DF_mul_days_sum['b'], options.b.swap);

                previous_DF_sum['a'] += DF['a'];
                previous_DF_sum['b'] += DF['b'];
                previous_DF_mul_days_sum['a'] += DF['a'] * days;
                previous_DF_mul_days_sum['b'] += DF['b'] * days;
            }

            // fill DF into table
            if (DF['a']) {
                $this.find('.df.a').text(DF['a'].toFixed(10));
                $this.find('.rate.a').removeClass("error");
            } else {
                $this.find('.rate.a').addClass("error");
            }
            if (DF['b']) {
                $this.find('.df.b').text(DF['b'].toFixed(10));
                $this.find('.rate.b').removeClass("error");
            } else {
                $this.find('.rate.b').addClass("error");
            }

            // store DF & rates & total_days into <tr> DOM
            $this.data('rates', rates);
            $this.data('DF', DF);
            $this.data('total_days', total_days);
        });
    }

    /**
     * Calculation & helper functions
     */

    function calculateMoneyDF(rate_pc, days, option) {
        option = option.trim().toLowerCase();
        var rate = parseFloat(rate_pc / 100);
        days = parseInt(days);

        if (!(option && rate && days)) return false;
        var d = -1;
        switch (option) {
            case 'act/360':
                d = 360;
                break;

            case 'act/365':
                d = 365;
                break;

            default:
                return false;
        }

        return (1 / (1 + rate * days / d));
    }

    function calculateSwapDF(rate_pc, days, previous_DF_sum, previous_DF_mul_days_sum, option) {
        option = option.trim().toLowerCase();
        var rate = parseFloat(rate_pc / 100);
        days = parseInt(days);
        previous_DF_sum = parseFloat(previous_DF_sum);
        previous_DF_mul_days_sum = parseFloat(previous_DF_mul_days_sum);

        if (!(option && rate && days)) return false;

        var d = -1;
        switch (option) {
            case '30/360':
                return (1 - rate * previous_DF_sum) / (1 + rate);

            case 'act/360':
                d = 360;
                break;

            case 'act/365':
                d = 365;
                break;

            default:
                return false;
        }

        return ((1 - rate * previous_DF_mul_days_sum / d) / (1 + rate * days / d));
    }

    function getOptions() {
        $options = $('.options');
        return {
            a: {
                money: $options.find('select.a.money').val(),
                swap: $options.find('select.a.swap').val()
            },
            b: {
                money: $options.find('select.b.money').val(),
                swap: $options.find('select.b.swap').val()
            }
        };
    }

    function toDateString(dateObj) {
        if (dateObj instanceof Date) {
            return dateObj.getDate() + '/' + (dateObj.getMonth() + 1) + '/' + dateObj.getFullYear();
        } else {
            return false;
        }
    }

    function validatePercentage(text) {
        if (!text) return false;
        if (Number(text) != parseFloat(text)) return false;
        var pct = parseFloat(text);
        if (pct < 0 || pct > 100) return false;
        return pct;
    }

    function isInputChanged() {
        if (this.nodeName.toUpperCase() === "INPUT") {
            var old_value = validatePercentage($(this).data('old_value'));
            var new_value = validatePercentage($(this).val());
            if (old_value === new_value) return false;
            $(this).data('old_value', new_value);
        }
        return true;
    }

    /**
     * Main procedure
     */

    $(document).ready(function () {
        // initiate
        initiateDate();
        constructTable();
        updateTable();
        graph.create();

        // register listeners
        $('input.rate, .options select').on('input', function () {
            if (!isInputChanged.bind(this)()) return false;
            console.info('Date Updated');
            updateTable();
            graph.update();
        });

        $('input.rate').focusout(function () {
            var raw_val = $(this).val();
            val = validatePercentage(raw_val) ? parseFloat(raw_val) : 2.5;
            if (val.toFixed(2) === raw_val) return false;

            $(this).val(val.toFixed(2));
            if (!isInputChanged.bind(this)()) return false;
            updateTable();
            graph.update();
        });

        $('input#startDate').on('change', function () {
            console.info('Date Updated');
            updateTable();
            graph.update();
        });

        $(window).resize(function () {
            graph.update();
        });
    });

    return {
        getStartDate: getStartDate
    }
})(jQuery);