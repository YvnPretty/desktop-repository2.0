<?php
// db.php
try {
    // Create (connect to) SQLite database in file
    $db = new PDO('sqlite:database.db');
    // Set errormode to exceptions
    $db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Create table if not exists
    $db->exec("CREATE TABLE IF NOT EXISTS items (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT NOT NULL,
        description TEXT
    )");

} catch(PDOException $e) {
    echo "Connection failed: " . $e->getMessage();
    exit();
}
?>
