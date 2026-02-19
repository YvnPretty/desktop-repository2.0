<?php
// index.php
require 'db.php';

// Fetch all items
$stmt = $db->query("SELECT * FROM items");
$items = $stmt->fetchAll(PDO::FETCH_ASSOC);
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>PHP CRUD App</title>
    <link rel="stylesheet" href="static/style.css">
</head>
<body>
    <nav>
        <a href="index.php">Home</a>
        <a href="create.php">Add Item</a>
    </nav>
    <div class="content">
        <h1>Items</h1>
        <?php if (count($items) > 0): ?>
            <?php foreach ($items as $item): ?>
                <div class="item">
                    <h2><?php echo htmlspecialchars($item['name']); ?></h2>
                    <p><?php echo htmlspecialchars($item['description']); ?></p>
                    <a href="edit.php?id=<?php echo $item['id']; ?>">Edit</a>
                    <a href="delete.php?id=<?php echo $item['id']; ?>" onclick="return confirm('Are you sure?')">Delete</a>
                </div>
            <?php endforeach; ?>
        <?php else: ?>
            <p>No items found. Add one!</p>
        <?php endif; ?>
    </div>
</body>
</html>
