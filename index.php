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
        <div class='col-xs-12'>
            <table width="100%" id="tableA" class="table-hover table-inputs table-striped">
                <thead>
                <tr class="options">
                    <td rowspan="2">
                        <label for="startDate">Start date:</label><input type="text" class="form-control"
                                                                         id="startDate">
                        <script type="text/javascript">
                            $(function () {
                                $('#startDate').datepicker();
                            });
                        </script>
                    </td>
                    <th class="text-right">Money Rates</th>
                    <td colspan="2" class="text-center">
                        <select class="red form-control">
                            <option>act/360</option>
                            <option>act/365</option>
                        </select>
                    </td>
                    <td colspan="2" class="text-center">
                        <select class="blue form-control">
                            <option>act/360</option>
                            <option>act/365</option>
                        </select>
                    </td>

                </tr>
                <tr class="options">
                    <th class="text-right">Swap Rates</th>
                    <td colspan="2" class="text-center">
                        <select class="red form-control">
                            <option>30/360</option>
                            <option>act/360</option>
                            <option>act/365</option>
                        </select>
                    </td>
                    <td colspan="2" class="text-center">
                        <select class="blue form-control">
                            <option>30/360</option>
                            <option>act/360</option>
                            <option>act/365</option>
                        </select>
                    </td>
                </tr>
                <tr class="space">
                    <td colspan="6"></td>
                </tr>
                <tr>
                    <th>t</th>
                    <th class="text-center">#days</th>
                    <th width="60" class="red">Rate %</th>
                    <th width="100" class="red">Discount Factor</th>
                    <th width="60" class="blue">Rate %</th>
                    <th width="100" class="blue text-right">Discount Factor</th>
                </tr>
                </thead>
                <tbody>
                <tr>
                    <td title="3months">3m</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>6m</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>9m</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>1</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50" autocomplete="off"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>2</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>3</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>4</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>5</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>6</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>7</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>8</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>9</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
                <tr>
                    <td>10</td>
                    <td class="text-center">92</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                    <td><input type="text" class="form-control rate" value="2.50"></td>
                    <td class="text-right">0,9936516699</td>
                </tr>
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

</div>

</body>
</html>