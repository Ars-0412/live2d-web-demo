(async function () {
  console.log("🔍 Debugging Live2D resource paths...");

  const pathsToCheck = [
    "/Resources/Haru/Haru.model3.json",
    "/Resources/Haru/Haru.moc3",
    "/Resources/Haru/Haru.physics3.json",
    "/Resources/Haru/Haru.pose3.json",
    "/Resources/Haru/expressions/F01.exp3.json",
    "/Resources/back_class_normal.png",
    "/Resources/icon_gear.png",
  ];

  for (const path of pathsToCheck) {
    try {
      const response = await fetch(path, { method: "HEAD" });
      if (!response.ok) {
        console.error(`❌ [404] Not Found: ${path}`);
      } else {
        console.log(`✅ Found: ${path}`);
      }
    } catch (error) {
      console.error(`🚨 Error accessing ${path}:`, error);
    }
  }

  console.log("🔎 Debugging completed.");
})();
