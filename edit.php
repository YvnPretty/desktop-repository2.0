<?php
// edit.php
require 'db.php';

if (!isset($_GET['id'])) {
    header("Location: index.php");
    exit();
}

$id = $_GET['id'];
$stmt = $db->prepare("SELECT * FROM items WHERE id = :id");
$stmt->bindParam(':id', $id);
$stmt->execute();
$item = $stmt->fetch(PDO::FETCH_ASSOC);

if (!$item) {
    die("Item not found!");
}

if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $name = $_POST['name'];
    $description = $_POST['description'];

    if (!empty($name)) {
        $stmt = $db->prepare("UPDATE items SET name = :name, description = :description WHERE id = :id");
        $stmt->bindParam(':name', $name);
        $stmt->bindParam(':description', $description);
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            header("Location: index.php");
            exit();
        } else {
            echo "Error updating item.";
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
    <title>Edit Item</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <nav>
        <a href="index.php">Home</a>
    </nav>
    <div class="content">
        <h1>Edit Item</h1>
        <form method="post">
            <label for="name">Name</label>
            <input type="text" name="name" value="<?php echo htmlspecialchars($item['name']); ?>" required>
            
            <label for="description">Description</label>
            <textarea name="description"><?php echo htmlspecialchars($item['description']); ?></textarea>

            <button type="submit">Update</button>
        </form>
    </div>
</body>
</html>
