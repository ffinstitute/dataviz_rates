<html>
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=UTF-8">

	<title>Dataviz title by First Finance Institute</title>
	<link rel="shortcut icon" href="img/favicon.jpg">
	<!-- Bootstrap core CSS -->
	<link href="css/bootstrap.min.css" rel="stylesheet">
	<link href="css/jquery-ui.css" rel="stylesheet">
	<link href="css/d3.css" rel="stylesheet">
	<link href="css/main.css" rel="stylesheet">

	<!-- Font awesome -->
	<link href="./css/font-awesome/4.6.3/css/font-awesome.min.css" rel="stylesheet">

	<script src="./lib/jquery.min.js"></script>
	<script src="./lib/bootstrap.js"></script>
	<script src="./lib/d3.v3.min.js"></script>
	<script src="./js/main.js"></script>
	<script src="./js/ratecurve.js"></script>

</head>

<body>

<div class='container bs-docs-container'>

	<h1><a href='https://first-finance.institute' target=_blank><img src='img/logo_ffi_48px.png' title='First Finance Institute' width=32 style="vertical-align: top"></a> Dataviz rates</h1>
	<hr />
	<?php 
	//https://docs.google.com/spreadsheets/d/1xwRvPs14zlTLQFlQmVg1KRoVQ2YUyLPFqWztVqwC2_o/edit#gid=0
	?>
	

	<div class=row>
		<div class='col-sm-6'>
			Start date : <input type=date id=startDate>
		</div>
	</div>

	<hr />

	<div class=row>
		<div class='col-xs-3'>
			<b>Money rates</b>
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

		<div class='col-xs-3'>
			<b>Swap rates</b>
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

		<div class='col-xs-3'>
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

		<div class='col-xs-3'>
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

	<hr />

	<div class=row>
		<div class='col-sm-6'>
			<table width=100% id=tableA class='table-striped table-inputs'>
				<thead>
					<th width=40>t</th>
					<th width=60>Date</th>
					<th>Rate %</th>
					<th width=40>#days</th>
					<th>Disc.F</th>
				</thead>
				<tbody>
					<tr><td>3m<td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>92 <td class='r'>df
					<tr><td>6m<td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>92 <td class='r'>df
					<tr><td>9m<td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>100<td class='r'>df
					<tr><td>1 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>102<td class='r'>df
					<tr><td>2 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>105<td class='r'>df
					<tr><td>3 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>110<td class='r'>df
					<tr><td>4 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>123<td class='r'>df
					<tr><td>5 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>154<td class='r'>df
					<tr><td>6 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>155<td class='r'>df
					<tr><td>7 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>160<td class='r'>df
					<tr><td>8 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>170<td class='r'>df
					<tr><td>9 <td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>180<td class='r'>df
					<tr><td>10<td>2016-01-01<td><input type=text class='form-control rate' value='2.50'><td class='r'>190<td class='r'>df
				</tbody>
			</table>
		</div>

		<div class='col-sm-6'>
			Col-B
		</div>
	</div>
	
	<hr />
	
	<div class=row>
		<div class='col-sm-6' id=graphA>
			Graph-A (rate curves)
		</div>

		<div class='col-sm-6' id=graphB>
			Graph-B (discount factors)
		</div>
	</div>
	
	<hr />
	
	<div class=row>
		<pre>https://docs.google.com/spreadsheets/d/1xwRvPs14zlTLQFlQmVg1KRoVQ2YUyLPFqWztVqwC2_o/edit#gid=0</pre>
	</div>

</div>

</body>
</html>