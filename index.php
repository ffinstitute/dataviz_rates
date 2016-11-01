<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>Discount Factors by First Finance Institute</title>
    <link rel="shortcut icon" href="img/favicon.jpg">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/jquery-ui.css" rel="stylesheet">
    <link href="css/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">

    <!-- Font awesome -->
    <link href="css/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">

    <script src="lib/jquery.min.js"></script>
    <script src="lib/bootstrap.js"></script>
    <script src="lib/d3.v4.min.js"></script>
    <script src="lib/bootstrap-datepicker.min.js"></script>
    <script src="lib/mustache.min.js"></script>
</head>

<body>
<div class='container bs-docs-container'>

    <h2 class="caption">
        <a href='https://first-finance.institute' target=_blank>
            <img src='img/logo_ffi_32px.png' title='First Finance Institute' style="vertical-align: top"/>
        </a>
        Swap Curves and Discount Factors</h2>
    <hr/>
    <div class=row>
        <div class='col-xs-12'>
            <table width="100%" id="tableA" class="table-hover table-inputs">
                <thead>
                <tr>
                    <th colspan="2" class="text-right">Start Date</th>
                    <td colspan="5">
                        <input type="text" class="form-control" data-provide="datepicker" data-date-format="dd/mm/yyyy"
                               data-date-autoclose="true" id="startDate" readonly>
                    </td>
                </tr>
                <tr class="options">
                    <th colspan="2" class="text-right">Money Rates</th>
                    <td colspan="2">
                        <div class="btn-group btn-group-xs money red a" data-toggle="buttons">
                            <label class="btn btn-default active">
                                <input type="radio" name="option0" autocomplete="off" checked>act/360
                            </label>
                            <label class="btn btn-default">
                                <input type="radio" name="option0" autocomplete="off">act/365
                            </label>
                        </div>
                    </td>
                    <th class="separator text-right">Money Rates</th>
                    <td colspan="2">
                        <div class="btn-group btn-group-xs money blue b" data-toggle="buttons">
                            <label class="btn btn-default active">
                                <input type="radio" name="option1" autocomplete="off" checked>act/360
                            </label>
                            <label class="btn btn-default">
                                <input type="radio" name="option1" autocomplete="off">act/365
                            </label>
                        </div>
                    </td>

                </tr>
                <tr class="options">
                    <th colspan="2" class="text-right">Swap Rates</th>
                    <td colspan="2">
                        <div class="btn-group btn-group-xs swap red a" data-toggle="buttons">
                            <label class="btn btn-default active">
                                <input type="radio" name="option2" autocomplete="off" checked>30/360
                            </label>
                            <label class="btn btn-default">
                                <input type="radio" name="option2" autocomplete="off">act/360
                            </label>
                            <label class="btn btn-default">
                                <input type="radio" name="option2" autocomplete="off">act/365
                            </label>
                        </div>
                    </td>
                    <th class="separator text-right">Swap Rates</th>
                    <td colspan="2">
                        <div class="btn-group btn-group-xs swap blue b" data-toggle="buttons">
                            <label class="btn btn-default active">
                                <input type="radio" name="option3" autocomplete="off" checked>30/360
                            </label>
                            <label class="btn btn-default">
                                <input type="radio" name="option3" autocomplete="off">act/360
                            </label>
                            <label class="btn btn-default">
                                <input type="radio" name="option3" autocomplete="off">act/365
                            </label>
                        </div>
                    </td>
                </tr>
                <tr class="space">
                    <td colspan="6"></td>
                </tr>
                <tr>
                    <th class="t">t</th>
                    <th class="text-center">#days</th>
                    <th class="text-right red">Rate %</th>
                    <th class="text-right red">Discount Factor</th>
                    <th class="separator"></th>
                    <th class="text-right blue">Rate %</th>
                    <th class="blue text-right">Discount Factor</th>
                </tr>
                </thead>
                <tbody>
                </tbody>
            </table>
        </div>


    </div>

    <div class="row" style="margin-top: 40px;">
        <div class="col-xs-12" id="graph">
        </div>
    </div>

    <script id="template-table-row" type="x-tmpl-mustache">
        <tr data-m="{{ m }}" data-y="{{ y }}" data-t="{{ t }}">
            <td class="t" title="{{ t_full }}">{{ t }}</td>
            <td class="days text-center"></td>
            <td class="input"><input type="text" class="form-control rate a" tabindex="1" value="{{ rate_a }}"
                                     data-old_value="{{ rate_a }}"
                                     maxlength="5"></td>
            <td class="df a text-right">0.0000000000</td>
            <td class="separator"></td>
            <td class="input"><input type="text" class="form-control rate b" tabindex="2" value="{{ rate_b }}"
                                     data-old_value="{{ rate_b }}"
                                     maxlength="5"></td>
            <td class="df b text-right">0.0000000000</td>
        </tr>
    </script>

    <script src="js/main.js"></script>
    <script src="js/graphs.js"></script>
</body>
</html>