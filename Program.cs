WebApplicationBuilder builder = WebApplication.CreateBuilder(args);
WebApplication app = builder.Build();

app.UseDefaultFiles();
app.UseStaticFiles();

string greetingMessage = "Welcome to the Internet Project Guide";
string allMessages = "Hello from the server";

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
	return Results.Text(allMessages);
}

IResult UpdateMessage(HttpRequest request)
{
	string message = request.Form["message"].ToString();
	if (!string.IsNullOrEmpty(message))
	{
		string timestamp = DateTime.Now.ToString("yyyy-MM-dd HH:mm:ss");
		allMessages += $"\n[{timestamp}] {message}";
	}
	return Results.Redirect("/examples.html");
}

IResult GetCurrentTime()
{
	var now = DateTime.Now;
	var formatted = now.ToString("dd/MM/yyyy HH:mm:ss");
	return Results.Text(formatted);
}
