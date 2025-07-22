import pandas as pd
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import StandardScaler
from sklearn.ensemble import BaggingRegressor
from sklearn.tree import DecisionTreeRegressor
import joblib 


df = pd.read_csv("../data/cleaned_destinations.csv")

# Drop non-numeric columns including popular_activities
categorical_cols = ['category', 'city', 'best_season']
X = df.drop(['place_name', 'description', 'estimated_cost', 'popular_activities'], axis=1)

# One-hot encode categorical columns
X = pd.get_dummies(X, columns=categorical_cols)

X = X.astype(int)
y = df['estimated_cost']

scaler = StandardScaler()
X_scaled = scaler.fit_transform(X)

# Split data
X_train, X_test, y_train, y_test = train_test_split(X_scaled, y, test_size=0.2, random_state=42)

# Bagging regressor with decision tree base
base_model = DecisionTreeRegressor(max_depth=5, random_state=42)
bagging_model = BaggingRegressor(
    
    n_estimators=50,
    random_state=42
)

bagging_model.fit(X_train, y_train)

y_pred = bagging_model.predict(X_test)

print("Predicted values:", y_pred)

joblib.dump(bagging_model, "model.pkl")
joblib.dump(scaler, "scaler.pkl")
joblib.dump(X.columns.tolist(), "features.pkl")
