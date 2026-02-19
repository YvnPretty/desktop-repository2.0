<?php
// create.php
require 'db.php';

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $description = $_POST['description'];

    if (!empty($name)) {
        $stmt = $db->prepare("INSERT INTO items (name, description) VALUES (:name, :description)");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        
        if ($stmt->execute()) {
            header("Location: index.php");
            exit();
        } else {
            echo "Error creating item.";
        }
    } else {
        echo "Name is required.";
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Create Item</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <nav>
        <a href="index.php">Home</a>
    </nav>
    <div class="content">
        <h1>Create Item</h1>
        <form method="post">
            <label for="name">Name</label>
            <input type="text" name="name" placeholder="Item Name" required>
            
            <label for="description">Description</label>
            <textarea name="description" placeholder="Item Description"></textarea>

            <button type="submit">Submit</button>
        </form>
    </div>
</body>
</html>
