<?php
// delete.php
require 'db.php';

if (isset($_GET['id'])) {
    $id = $_GET['id'];
    
    // Check if id exists
    $stmt = $db->prepare("SELECT id FROM items WHERE id = :id");
    $stmt->bindParam(':id', $id);
    $stmt->execute();

    if ($stmt->fetch()) {
        $stmt = $db->prepare("DELETE FROM items WHERE id = :id");
        $stmt->bindParam(':id', $id);
        
        if ($stmt->execute()) {
            header("Location: index.php");
            exit();
        } else {
            echo "Error deleting item.";
        }
    } else {
        echo "Item not found.";
    }
} else {
    header("Location: index.php");
    exit();
}
?>
