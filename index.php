<!DOCTYPE html>
<html lang="en">
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

    <title>Dataviz title by First Finance Institute</title>
    <link rel="shortcut icon" href="img/favicon.jpg">
    <!-- Bootstrap core CSS -->
    <link href="css/bootstrap.min.css" rel="stylesheet">
    <link href="css/jquery-ui.css" rel="stylesheet">
    <link href="css/d3.css" rel="stylesheet">
    <link href="css/datepicker/bootstrap-datepicker3.min.css" rel="stylesheet">
    <link href="css/main.css" rel="stylesheet">

    <!-- Font awesome -->
    <link href="css/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">

    <script src="lib/jquery.min.js"></script>
    <script src="lib/bootstrap.js"></script>
    <script src="lib/d3.v3.min.js"></script>
    <script src="lib/bootstrap-datepicker.min.js"></script>
    <script src="js/main.js"></script>

</head>

<body>

<div class='container bs-docs-container'>

    <h2><a href='https://first-finance.institute' target=_blank><img src='img/logo_ffi_32px.png'
                                                                     title='First Finance Institute'
                                                                     style="vertical-align: top"></a> Dataviz rates</h2>
    <hr/>

    <div class=row>

        <div class='col-xs-4'>
            Start date : <input type="text" class="form-control" id="startDate">
            <script type="text/javascript">
                $(function () {
                    $('#startDate').datepicker();
                });
            </script>
        </div>

        <div class='col-xs-4'>
            <div class='col-xs-6'>
                <b style='color:#cc0000'>Money rates</b>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsA" id="optionsRadios1" value="option1" checked>
                        act/360
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsA" id="optionsRadios2" value="option2">
                        act/365
                    </label>
                </div>
            </div>

            <div class='col-xs-6'>
                <b style='color:#cc0000'>Swap rates</b>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsB" id="optionsRadios1" value="option1" checked>
                        30/360
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsB" id="optionsRadios2" value="option2">
                        act/360
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsB" id="optionsRadios2" value="option2">
                        act/365
                    </label>
                </div>
            </div>
        </div>


        <div class='col-sm-4'>

            <div class='col-xs-6'>
                <b>Money rates</b>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsC" id="optionsRadios1" value="option1" checked>
                        act/360
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsC" id="optionsRadios2" value="option2">
                        act/365
                    </label>
                </div>
            </div>

            <div class='col-xs-6'>
                <b>Swap rates</b>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsD" id="optionsRadios1" value="option1" checked>
                        30/360
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsD" id="optionsRadios2" value="option2">
                        act/360
                    </label>
                </div>
                <div class="radio">
                    <label>
                        <input type="radio" name="optionsD" id="optionsRadios2" value="option2">
                        act/365
                    </label>
                </div>
            </div>
        </div>
    </div>


    <div class=row>
        <div class='col-xs-12'>
            <table width=100% id=tableA class='table-hover table-inputs'>
                <thead>
                <th width=35>t</th>
                <th class=center>#days</th>
                <th width=60 style='color:#cc0000'>Rate %</th>

                <th width=100 style='color:#cc0000' class='r'>Discount Factor</th>

                <th>&nbsp;</th>

                <th width=60 style='color:#000000'>Rate %</th>

                <th width=100 style='color:#000000' class='r'>Discount Factor</th>
                </thead>
                <tbody>
                <tr>
                    <td title='3months'>3m
                    <td title='calculated date'>92
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516699
                <tr>
                    <td>6m
                    <td>92
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>9m
                    <td>100
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>1
                    <td>102
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>2
                    <td>105
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>3
                    <td>110
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>4
                    <td>123
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>5
                    <td>154
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>6
                    <td>155
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>7
                    <td>160
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>8
                    <td>170
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>9
                    <td>180
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                <tr>
                    <td>10
                    <td>190
                    <td><input type=text class='form-control rate' value='2.50'>
                    <td class='r'>0,9936516
                </tbody>
            </table>
        </div>


    </div>

    <hr/>

    <div class=row>
        <div class='col-sm-6' id=graphA>
            Graph-A (rate curves)
            Xscale -> days
            Xscale ticks are "3m, 6m, 9m, 1Year, 2Y, etc"
        </div>

        <div class='col-sm-6' id=graphB>
            Graph-B (discount factors)
        </div>
    </div>

    <hr/>

    <p>
        <a href="https://docs.google.com/spreadsheets/d/1xwRvPs14zlTLQFlQmVg1KRoVQ2YUyLPFqWztVqwC2_o/edit#gid=0"
           target="_blank">Calculation
            reference</a>
        <br/>
        Color ref:
        Blue:#4986DB
        Red:#cc0000

    </p>

    <select class=form-control>
        <option>30/360</option>
        <option>act/360</option>
        <option>act/365</option>
    </select>

    <select class=form-control size=3>
        <option>30/360</option>
        <option>act/360</option>
        <option>act/365</option>
    </select>

</div>

</body>
</html>