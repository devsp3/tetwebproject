var builder = WebApplication.CreateBuilder(args);
var app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

var greetingMessage = "Welcome to the Internet Project Guide";
var currentMessage = "Hello from the server";

app.MapGet("/api/greeting", GetGreeting);
app.MapGet("/api/message", GetMessage);
app.MapGet("/api/current-time", GetCurrentTime);
app.MapPost("/api/message", UpdateMessage);

app.Run();

IResult GetGreeting()
{
	return Results.Text(greetingMessage);
}

IResult GetMessage()
{
	return Results.Text(currentMessage);
}

IResult UpdateMessage(HttpRequest request)
{
	var message = request.Form["message"].ToString();

	currentMessage = message;

	return Results.Redirect("/examples.html");
}

IResult GetCurrentTime()
{
	var now = DateTime.Now;
	var formatted = now.ToString("dd/MM/yyyy HH:mm:ss");
	return Results.Text(formatted);
}
